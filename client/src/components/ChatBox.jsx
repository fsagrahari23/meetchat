import React, { useEffect, useRef, useState } from 'react';
import useSocket from '../providers/UseSocket';

const ChatBox = ({ remoteEmailID, myEmail }) => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const socket = useSocket();
  const messagesEndRef = useRef(null); // 🔑 for auto-scroll

  const handleSend = () => {
    if (input.trim() === '') return;
    const newMsg = { from: myEmail, message: input };

    socket.emit('message', { toEmail: remoteEmailID, message: input });
    setMessages((prevMessages) => [...prevMessages, newMsg]);
    setInput('');
  };

  useEffect(() => {
    const handleIncomingMessage = (msg) => {
      setMessages((prevMessages) => [...prevMessages, msg]);
    };

    socket.on('message', handleIncomingMessage);

    return () => {
      socket.off('message', handleIncomingMessage);
    };
  }, [socket]);

  // 🔑 Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSend();
    }
  };

  return (
    <div className="flex flex-col h-full w-full p-4 bg-gray-800 rounded-lg shadow-lg text-white">
      <div className="flex-1 overflow-y-auto mb-4 border border-gray-700 rounded p-2">
        {messages.length === 0 ? (
          <p className="text-gray-400 text-center">No messages yet</p>
        ) : (
          messages.map((msg, index) => (
            <div
              key={index}
              className={`mb-2 p-2 rounded max-w-xs ${
                msg.from === myEmail
                  ? 'bg-blue-600 self-end text-right ml-auto'
                  : 'bg-gray-700 self-start text-left mr-auto'
              }`}
            >
              <p className="text-sm text-gray-300">{msg.from}</p>
              <p>{msg.message}</p>
            </div>
          ))
        )}
        {/* 🔑 Auto-scroll anchor */}
        <div ref={messagesEndRef} />
      </div>
      <div className="flex">
        <input
          type="text"
          className="flex-1 border border-gray-700 rounded-l px-3 py-2 bg-gray-900 text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
          placeholder="Type a message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <button
          onClick={handleSend}
          className="bg-blue-600 text-white px-4 py-2 rounded-r hover:bg-blue-700 transition"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatBox;
