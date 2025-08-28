# Omegle Clone - Real-time Video Chat Application

A full-stack real-time video chat application built with React, WebRTC, Socket.IO, and Node.js/Express. This application allows users to connect with each other for real-time video calling and messaging, similar to Omegle.

## Key Features

- **Real-time Video Calling**: Peer-to-peer video streaming using WebRTC
- **Instant Messaging**: Real-time text chat between connected users
- **Room-based Connections**: Users join rooms to connect with others
- **Responsive UI**: Modern, mobile-friendly interface with Tailwind CSS
- **Cross-platform Compatibility**: Works on all modern browsers

## Technologies Used

### Frontend
- **React 19** - UI library for building the user interface
- **React Router v7** - Navigation and routing
- **Tailwind CSS v4** - Utility-first CSS framework for styling
- **Socket.IO Client** - Real-time communication with the server
- **WebRTC** - Peer-to-peer video and audio streaming
- **Vite 7** - Fast build tool and development server

### Backend
- **Node.js** - JavaScript runtime environment
- **Express.js 4.18.2** - Web application framework
- **Socket.IO** - Real-time bidirectional event-based communication
- **CORS** - Cross-origin resource sharing middleware

## Project Structure

```
├── client/                 # React frontend application
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   ├── pages/          # Page components (Home, Room)
│   │   ├── providers/      # Context providers (Socket, Peer)
│   │   ├── App.jsx         # Main application component
│   │   └── main.jsx        # Application entry point
│   ├── index.html          # HTML template
│   └── package.json        # Frontend dependencies
├── server/                 # Node.js/Express backend
│   ├── index.js            # Server entry point
│   └── package.json        # Backend dependencies
└── README.md               # This file
```

## Setup Instructions

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- Modern web browser with camera and microphone access

### Installation

1. **Install dependencies for both client and server:**

```bash
# Install client dependencies
cd client
npm install

# Install server dependencies
cd ../server
npm install
```

### Development Mode

You'll need to run both the frontend and backend servers simultaneously:

**Terminal 1 - Start the backend server:**
```bash
cd server
npm start
```

**Terminal 2 - Start the frontend development server:**
```bash
cd client
npm run dev
```

- Frontend will be available at `http://localhost:5173`
- Backend API will be available at `http://localhost:5000`
- Socket.IO server runs on port `5001`

### Production Build

```bash
# Build the React app
cd client
npm run build

# The built files will be in client/dist/
```

### Running in Production

```bash
cd server
npm start
```

The full application will be available at `http://localhost:5000`

## How to Use

1. **Access the Application**: Open your browser and go to `http://localhost:5173` (development) or `http://localhost:5000` (production)

2. **Join a Room**:
   - Enter your email ID
   - Enter or create a room ID
   - Click "Join"

3. **Connect with Others**:
   - When another user joins the same room, you'll be connected
   - Click "Send My Video" to start streaming your video
   - Use the chat box on the right to send messages

## How It Works

### WebRTC Signaling Process

1. **Room Joining**: Users join rooms using Socket.IO for coordination
2. **Connection Initiation**: When a new user joins, an offer is created using WebRTC
3. **Offer Exchange**: The offer is sent through Socket.IO to the other user
4. **Answer Creation**: The receiving user creates an answer to the offer
5. **Answer Exchange**: The answer is sent back through Socket.IO
6. **Connection Establishment**: Both peers establish a direct P2P connection
7. **Media Streaming**: Video and audio streams are exchanged directly between peers

### Socket.IO Events

- `join-room`: User joins a specific room
- `user-connected`: Notifies when a new user joins
- `call-user`: Initiates a WebRTC call with an offer
- `incoming-call`: Receives a call offer
- `call-accepted`: Confirms call acceptance with an answer
- `message`: Exchanges chat messages between users

## API Endpoints

- `GET /api/message` - Returns a welcome message
- `POST /api/data` - Accepts JSON data and returns a personalized response

## Development Scripts

### Client
- `npm run dev` - Start development server
- `npm run build` - Create production build
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

### Server
- `npm start` - Start the server with nodemon for development

## Browser Support

This application requires browsers that support:
- WebRTC (RTCPeerConnection, getUserMedia)
- Socket.IO v4+
- Modern JavaScript (ES6+)
- Tailwind CSS

Tested on:
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## Troubleshooting

1. **Camera/Microphone Access**: Ensure your browser has permission to access camera and microphone
2. **Connection Issues**: Check that both users are in the same room
3. **Firewall Problems**: WebRTC might be blocked by corporate firewalls
4. **Audio Issues**: Check system audio settings and browser permissions

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a pull request

## License

This project is licensed under the MIT License - see the LICENSE file for details.
