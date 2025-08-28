# Omegle Clone - Frontend

This is the frontend component of the Omegle Clone video chat application. It's built with React, Tailwind CSS, WebRTC, and Socket.IO Client.

## Features

- Real-time video calling using WebRTC
- Instant messaging with other connected users
- Room-based connections for pairing with others
- Responsive UI with Tailwind CSS styling
- React Router for navigation between pages

## Technologies Used

- **React 19** - UI library for building the user interface
- **React Router v7** - Navigation and routing
- **Tailwind CSS v4** - Utility-first CSS framework for styling
- **Socket.IO Client** - Real-time communication with the server
- **WebRTC** - Peer-to-peer video and audio streaming
- **Vite 7** - Fast build tool and development server

## Project Structure

```
src/
├── components/          # Reusable UI components (ChatBox)
├── pages/               # Page components (Home, Room)
├── providers/           # Context providers (Socket, Peer)
├── App.jsx             # Main application component
├── main.jsx            # Application entry point
├── index.css           # Global CSS styles
└── App.css             # Component-specific styles
```

## Development

To run the frontend in development mode:

```bash
npm run dev
```

This will start the Vite development server with hot module replacement.

## Building for Production

To create a production build:

```bash
npm run build
```

The built files will be in the `dist/` directory.

## Previewing Production Build

To preview the production build locally:

```bash
npm run preview
```

## Linting

To run ESLint for code quality checks:

```bash
npm run lint
```

## Key Components

### Home Page
- Allows users to enter their email and room ID
- Handles joining rooms through Socket.IO

### Room Page
- Displays local and remote video streams
- Provides controls for sending video
- Integrates the chat functionality

### ChatBox Component
- Real-time messaging between connected users
- Message history display with sender identification
- Auto-scrolling to new messages

### Providers
- **SocketProvider**: Manages the Socket.IO connection
- **PeerProvider**: Handles WebRTC peer connections

## Browser Support

This frontend requires browsers that support:
- WebRTC (RTCPeerConnection, getUserMedia)
- Socket.IO v4+
- Modern JavaScript (ES6+)
- Tailwind CSS

Tested on:
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+
