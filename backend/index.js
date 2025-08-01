import dotenv from 'dotenv'
dotenv.config();

import express from "express"
import cors from 'cors';
import cookieParser from 'cookie-parser';
import userRouter from './src/routes/user.routes.js';
import messageRouter from './src/routes/message.routes.js';
import { connectDB } from './src/config/db.config.js';
import { connectCloudinary } from './src/config/cloudinary.config.js';
import {Server} from "socket.io"
import http from "http"
import path from "path"

const FRONTEND_URL="http://localhost:5173";
const __dirname = path.resolve(); // & absolute path of current directory

const app = express();

app.use(cors({
  origin: FRONTEND_URL,
  credentials: true,
  // user can parse cookies with this parameter marked true
}));

app.use(express.json()); // allows you to extract JSON data
app.use(cookieParser()); // it will allow you to parse cookies

app.use('/api/chat-user', userRouter);
app.use('/api/chat-messages', messageRouter);

const httpServer = http.createServer(app);
const server = new Server(httpServer, {
  cors: {
    origin: FRONTEND_URL,
    methods: ["GET", "POST", "PUT"],
    credentials: true, // it allows us to parse cookies 
  }
});

// ^ store online users
// * {userId: socketId}
const userSocketMap = {};

// it will return receiver's socket id
const getReceiverSocketId = (userId) => userSocketMap[userId];

// * understand it as : socket is a user
server.on("connection", (socket) => {
  console.log(`${socket.id} connected`);
  
  // ^ fetch useId from params that we've passed in io() while creating a connection
  const {userId} = socket.handshake.query;

  // ! if user id exists then craete a new entry for new user
  // ~ this is the same thing that we've done with cartItems[id] 
  if(userId){
    userSocketMap[userId] = socket.id  
  }

  // & Object.entries() --> returns 2D array ==> [...[key, value]]
  server.emit("getOnlineUsers", Object.keys(userSocketMap)); // & returns 1D array of keys

  socket.on("disconnect", () => {
    console.log(`${socket.id} disconnected`);

    // if user disconnecte the alwo remove it from the map
    delete userSocketMap[userId];
    server.emit("getOnlineUsers", Object.keys(userSocketMap)); // & returns 1D array of keys
  })
});

if(process.env.NODE_ENV === "production"){
  app.use(express.static(path.join(__dirname, "../frontend/dist")));
  /* 
    ^ This tells Express to serve static files (like HTML, JS, CSS, images, etc.) from the ../frontend/dist directory.
  */
}

const PORT = process.env.PORT || 5001;
httpServer.listen(PORT, () => {
  console.log("server running");
});

connectDB();
connectCloudinary();

export {
  getReceiverSocketId,
  server,
  FRONTEND_URL
}