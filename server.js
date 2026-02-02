import dotenv from 'dotenv';
dotenv.config();
import app from "./app.js";
import http from 'http';
import connectDB from './config/db.js';
import { initNats } from './services/nats.publisher.js';
import { subscribeMessageEvents } from './services/nats.subscriber.js';
import { Server } from 'socket.io';
import { initSocket } from './socket/index.js';

connectDB();
export const nc = initNats();
subscribeMessageEvents();

const PORT = process.env.PORT || 5002;

 
const server = http.createServer(app);

 
const io = new Server(server, {
  cors: {
    origin: "*",  
    methods: ["GET", "POST"],
  },
  transports: ["websocket", "polling"],
});

 
initSocket(io);

    
server.listen(PORT, '0.0.0.0', () => {
  console.log(`Server + Socket running on port ${PORT}`);
});
