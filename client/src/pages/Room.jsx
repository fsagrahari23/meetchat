import React, { useCallback, useEffect, useRef, useState } from "react";
import useSocket from "../providers/UseSocket";
import usePeer from "../providers/UsePeer";
import ChatBox from "../components/ChatBox";

const RoomPage = ({ emailId }) => {  // ✅ get my email from props
  const socket = useSocket();
  const { peer, createOffer, createAnswer, setRemoteAnswer, sendStream, remoteStream } = usePeer();

  const [mystream, setMyStream] = useState(null);
  const [remoteEmailID, setRemoteEmailID] = useState(null);

  const myVideoRef = useRef(null);
  const remoteVideoRef = useRef(null);

  // Caller: when new user joins, send an offer
  const handleNewUserJoined = useCallback(
    async (data) => {
      const { emailId: newUserEmail } = data;
      console.log("New user joined:", newUserEmail);

      const offer = await createOffer();
      socket.emit("call-user", { offer, emailId: newUserEmail });
      setRemoteEmailID(newUserEmail);
    },
    [createOffer, socket]
  );

  // Callee: when receiving an offer, create and send answer
  const handleIncomingCall = useCallback(
    async (data) => {
      const { from, offer } = data;
      console.log("Incoming call from:", from);

      const answer = await createAnswer(offer);
      socket.emit("call-accepted", { ans: answer, to: from });
      setRemoteEmailID(from);
    },
    [createAnswer, socket]
  );

  const handleAcceptedCall = useCallback(
    async (data) => {
      const { ans } = data;
      console.log("Call accepted, setting remote answer");
      await setRemoteAnswer(ans);
    },
    [setRemoteAnswer]
  );

  const handleNegotiationNeeded = useCallback(async () => {
    console.log("negotiation needed");
    const localOffer = await createOffer();
    socket.emit("call-user", { emailId: remoteEmailID, offer: localOffer });
  }, [createOffer, remoteEmailID, socket]);

  // Setup socket listeners
  useEffect(() => {
    socket.on("user-connected", handleNewUserJoined);
    socket.on("incoming-call", handleIncomingCall);
    socket.on("call-answered", handleAcceptedCall);

    return () => {
      socket.off("user-connected", handleNewUserJoined);
      socket.off("incoming-call", handleIncomingCall);
      socket.off("call-answered", handleAcceptedCall);
    };
  }, [socket, handleNewUserJoined, handleIncomingCall, handleAcceptedCall]);

  useEffect(() => {
    peer.addEventListener("negotiationneeded", handleNegotiationNeeded);
    return () => {
      peer.removeEventListener("negotiationneeded", handleNegotiationNeeded);
    };
  }, [peer, handleNegotiationNeeded]);

  // Get user media and attach to local video
  const getUserMediaStream = useCallback(async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });

      setMyStream(stream);

      if (myVideoRef.current) {
        myVideoRef.current.srcObject = stream;
      }
    } catch (err) {
      console.error("Error accessing camera/mic:", err);
    }
  }, []);

  useEffect(() => {
    getUserMediaStream();
  }, [getUserMediaStream]);

  // Attach remote stream when it changes
  useEffect(() => {
    if (remoteStream && remoteVideoRef.current) {
      remoteVideoRef.current.srcObject = remoteStream;
    }
  }, [remoteStream]);

  return (
    <div className="room-container flex h-screen bg-black text-white">
      <div className="flex flex-col flex-grow p-6 space-y-6 overflow-auto">
        <div className="max-w-xs">
          <h2 className="text-2xl font-bold mb-2">My Video</h2>
          <h4 className="text-lg mb-4">
            {remoteEmailID ? `You are connected to ${remoteEmailID}` : "Waiting for connection..."}
          </h4>
          <button
            onClick={async () => await sendStream(mystream)}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
          >
            Send My Video
          </button>
          <video
            ref={myVideoRef}
            autoPlay
            playsInline
            muted
            className="rounded-xl shadow-lg w-full h-auto bg-black mt-4"
          />
        </div>

        <div className="flex-grow">
          <h2 className="text-4xl font-bold mb-2">Remote Video</h2>
          <video
            ref={remoteVideoRef}
            autoPlay
            playsInline
            className="rounded-xl shadow-lg w-full h-auto bg-black mt-4"
          />
        </div>
      </div>

      {/* ✅ Chat Sidebar */}
      <div className="w-96 md:w-96 w-full bg-gray-900 p-4 overflow-y-auto">
        <ChatBox remoteEmailID={remoteEmailID} myEmail={emailId} />
      </div>
    </div>
  );
};

export default RoomPage;
