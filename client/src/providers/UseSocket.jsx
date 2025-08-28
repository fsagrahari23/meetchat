import { useContext } from "react";
import SocketContext from "../providers/SocketContext";

const useSocket = () => {
  const socket = useContext(SocketContext);

  if (!socket) {
    console.warn("⚠️ Socket not found! Did you wrap your app in <SocketProvider>?");
  } 

  return socket;
};

export default useSocket;
