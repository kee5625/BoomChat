import express from "express";
import "dotenv/config";
import cors from "cors";
import http from "http";
import { connectDB } from "./lib/db.js";
import {userRouter} from "./routes/userRoutes.js"
import messageRouter from "./routes/messageRoutes.js";
import { Server } from "socket.io";

// Create Express app and HTTP Server
const app = express(); // http handler and routes; core structure of app
const server = http.createServer(app) //create server

// Initialize socket.io server
export const io = new Server(server, {
    cors: {origin: "*"}
});

// Store online users
export const userSocketMap = {}; // {userId: socketId}

// Socket.io connection handler
io.on("connection", (socket)=>{
    const userId = socket.handshake.query.userId;
    console.log("User connected", userId);

    if(userId) userSocketMap[userId] = socket.id;

    // Emit online users to all connected clients
    io.emit("getOnlineUsers", Object,keys(userSocketMap));

    // disconnnect event
    socket.on("disconnect", ()=> {
        console.log("User disconnected", userId);
        delete userSocketMap[userId];
        io.emit("getOnlineUsers", Object.keys(userSocketMap));
    })
})

// Middleware setup
app.use(express.json({limit: "4mb"}));  //parse incoming json requests (4mb max)
app.use(cors()); //enable cors

//Route Setup
app.use("/api/status", (req, res)=>  res.send("Server is live"));   //route handler (when user visits /api/status --- something happens)
app.use("/api/auth", userRouter);   //authentication page
app.use("/api/messages", messageRouter); //messages route endpoint

// Connect to mongo db
await connectDB();

const PORT = process.env.PORT || 5000;  //set port to value declared in env, else 5000
server.listen(PORT, ()=> console.log("Server is running on PORT:" + PORT)); //start server on port

