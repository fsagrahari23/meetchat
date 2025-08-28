import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import "./App.css";
import { SocketProvider } from "./providers/SocketContext";
import RoomPage from "./pages/Room";
import { PeerProvider } from "./providers/Peer";

function App() {
  return (
    <div className="app">
      <SocketProvider>
        <PeerProvider>
          <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/room/:roomId" element={<RoomPage />} />
        </Routes>
        </PeerProvider>
        
      </SocketProvider>
    </div>
  );
}

export default App;
