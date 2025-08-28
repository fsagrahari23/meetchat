const express = require('express');
const cors = require('cors');
const path = require('path');
const bodyParser = require('body-parser');
const {Server} = require('socket.io');
const io = new Server({
  cors: {
    origin: '*',
    methods: ['GET', 'POST']
  }
});

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());


// Serve static files from the React app
app.use(express.static(path.join(__dirname, '../client/dist')));

// API Routes
app.get('/api/message', (req, res) => {
  res.json({ message: 'Hello from Express server!' });
});

app.post('/api/data', (req, res) => {
  const { name } = req.body;
  res.json({ message: `Hello ${name || 'World'}!` });
});

// Handle React routing, return all requests to React app
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/dist/index.html'));
});
const emailToSocket = new Map();
const socketToEmail = new Map();

io.on('connection', (socket) => {
  console.log('a user connected');

  socket.on('join-room', ({ roomId, emailId }) => {
    console.log('User', emailId, 'joined room', roomId);
    socket.join(roomId);

    socket.emit('joined-room', { roomId });

    emailToSocket.set(emailId, socket.id);
    socketToEmail.set(socket.id, emailId);

    socket.broadcast.to(roomId).emit('user-connected', { emailId });
  });

  socket.on('call-user', ({ offer, emailId }) => {
    console.log(offer)
    const socketID = emailToSocket.get(emailId);
    const fromEmail = socketToEmail.get(socket.id);
    console.log('Calling user', emailId);
    console.log('From user', fromEmail);

    if (socketID) {
      console.log('Sending signal to user', emailId);
      socket.to(socketID).emit('incoming-call', { from: fromEmail, offer });
    }
  });

  socket.on('call-accepted', ({ to, ans }) => {
    const socketID = emailToSocket.get(to);
    const fromEmail = socketToEmail.get(socket.id);
    console.log(ans)

    if (socketID) {
      socket.to(socketID).emit('call-answered', { from: fromEmail, ans });
    }
  });

  socket.on("message", ({ toEmail, message }) => {
  const targetSocketId = emailToSocket.get(toEmail);sc
  if (targetSocketId) {
    io.to(targetSocketId).emit("message", {
      from: socketToEmail.get(socket.id),
      message,
    });
  }
});

  socket.on('disconnect', () => {
    const email = socketToEmail.get(socket.id);
    if (email) {
      emailToSocket.delete(email);
      socketToEmail.delete(socket.id);
    }
    console.log('user disconnected');
  });
});


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
io.listen(5001,()=>{
  console.log('Server is running on port 5001');
})
