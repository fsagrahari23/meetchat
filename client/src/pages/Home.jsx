import React, { useEffect, useState,useCallback} from 'react';
import { useNavigate } from 'react-router-dom';
import useSocket from '../providers/UseSocket';

const Home = () => {
  const socket = useSocket();
  const navigate = useNavigate();
  const [emailId, setEmailId] = useState('');
  const [roomId, setRoomId] = useState('');

 const handleJoinRoom = useCallback(() => {
  if (!socket) return; 
  try {
    socket.emit('join-room', { emailId, roomId });
  } catch (err) {
    console.log("Socket emit error:", err);
  }
}, [socket, emailId, roomId]);


  const handleRoomJoined = useCallback(({ roomId }) => {
    navigate(`/room/${roomId}`);
  }, [navigate]);

  useEffect(()=>{
     socket.on('joined-room',handleRoomJoined)

     return () => {
       socket.off('joined-room',handleRoomJoined)
     }
  },[handleRoomJoined, socket])

  return (
    <div className='homepage-container'>
      <div className='input-container'>
        <input
          type="text"
          value={emailId}
          onChange={(e) => setEmailId(e.target.value)}
          placeholder='Enter your emailId'
        />
        <input
          type="text"
          value={roomId}
          onChange={(e) => setRoomId(e.target.value)}
          placeholder='Enter your room Id here'
        />
        <button onClick={handleJoinRoom}>Join</button>
      </div>
    </div>
  );
};

export default Home;
