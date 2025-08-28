import { useContext } from "react";
import PeerContext from "./Peer";

const usePeer = () => {
  const context = useContext(PeerContext);

  if (!context) {
    console.warn("⚠️ usePeer must be used inside a <PeerProvider>");
  }

  return context; // gives you { peer, createOffer }
};

export default usePeer;
