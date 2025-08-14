import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import cors from 'cors';

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST']
  }
});

app.use(cors());
app.use(express.json());

// In-memory storage for wheels
const wheels = {};

// Create a new wheel
app.post('/api/wheels', (req, res) => {
  const { options } = req.body;
  if (!options || !Array.isArray(options) || options.length < 2) {
    return res.status(400).json({ error: 'Wheel must have at least 2 options.' });
  }
  const id = Math.random().toString(36).substr(2, 8);
  wheels[id] = { id, options };
  res.json({ id, options });
});

// Get a wheel by ID
app.get('/api/wheels/:id', (req, res) => {
  const wheel = wheels[req.params.id];
  if (!wheel) return res.status(404).json({ error: 'Wheel not found.' });
  res.json(wheel);
});

// Socket.IO for real-time spin events
io.on('connection', (socket) => {
  socket.on('join-wheel', (wheelId) => {
    socket.join(wheelId);
  });

  socket.on('spin', ({ wheelId }) => {
    // Get wheel options
    const wheel = wheels[wheelId];
    if (!wheel) return;
    const numOptions = wheel.options.length;
    // Randomly select a landing angle anywhere on the wheel
    const landingAngle = Math.random() * 360;
    // Broadcast the landing angle to all clients in the room
    io.to(wheelId).emit('spin-result', { landingAngle });
  });
});

const PORT = process.env.PORT || 3001;
server.listen(PORT, () => {
  console.log(`Backend server running on port ${PORT}`);
});
