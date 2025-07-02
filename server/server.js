import express from "express";
import "dotenv/config";
import cors from "cors";
import http from "http";
import { connectDB } from "./lib/db.js";

// Create Express app and HTTP Server
const app = express(); // http handler and routes; core structure of app
const server = http.createServer(app) //create server

// Middleware setup
app.use(express.json({limit: "4mb"}));  //parse incoming json requests (4mb max)
app.use(cors()); //enable cors

app.use("/api/status", (req, res)=>  res.send("Server is live"));   //route handler (when user visits /api/status --- something happens)

// Connect to mongo db
await connectDB();

const PORT = process.env.PORT || 5000;  //set port to value declared in env, else 5000
server.listen(PORT, ()=> console.log("Server is running on PORT:" + PORT)); //start server on port