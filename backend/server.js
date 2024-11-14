import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

import authRoutes from "./routes/auth.route.js";
import messageRoutes from "./routes/message.route.js";
import userRoutes from "./routes/user.route.js";

import connectToMongodb from "./db/connectToMongodb.js";
import { app, server } from "./socket/socket.js";

//const app = express();
const PORT = process.env.PORT || 4000;

dotenv.config();

app.use(express.json());
app.use(cookieParser());

//Middleware
app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/users", userRoutes);

server.listen(PORT, () => {
  connectToMongodb();
  console.log(`Server running on ${PORT}`);
});
//npm run server -- command
//UldKNry8rL8OxUQT
//openssl rand -base64 32
