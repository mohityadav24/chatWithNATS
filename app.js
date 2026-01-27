import express from "express";
import cors from "cors";
import connectDB from "./config/db.js";
import authRoutes from "./routes/auth.routes.js";
import chatRoutes from "./routes/chat.routes.js";
import { initNats } from "./services/nats.publisher.js";

const app = express();
 
connectDB();
initNats()
 
app.use(cors());
app.use(express.json());





app.use("/api/chat", chatRoutes);

app.use("/api/auth", authRoutes);
export default app;
