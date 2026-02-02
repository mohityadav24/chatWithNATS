// import { initNats } from "./nats.publisher.js"
import Message from "../models/message.model.js"; // adjust path
import mongoose from "mongoose";
import { nc } from "../server.js";

export const subscribeMessageEvents = async () => {
  // const nc = await initNats();

  const sub = (await nc).subscribe("MESSAGE.NEW");

  (async () => {
    for await (const msg of sub) {
      const data = JSON.parse(msg.data.toString());
      console.log("📩 MESSAGE RECEIVED:", data);

      try {
        await Message.create({
          chatId: new mongoose.Types.ObjectId(data.chatId),
          sender: new mongoose.Types.ObjectId(data.sender),
          content: data.content,
          attachments: data.attachments || [],
          type: data.type || "text",
          status: data.status || "sent"
        });

        // TODO: websocket broadcast here
      } catch (err) {
        console.error("Subscriber save error:", err);
      }
    }
  })();
};