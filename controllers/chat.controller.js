import Chat from "../models/chat.model.js";
import Message from "../models/message.model.js";
import { publishMessage } from "../services/nats.publisher.js";

// Send message
export const sendMessage = async (req, res) => {
  try {
    const { chatId, content, type } = req.body;

    const message = await Message.create({
      chatId,
      sender: req.user._id,
      content,
      type
    });

    // Update last message in chat
    await Chat.findByIdAndUpdate(chatId, { lastMessage: message._id });

    // Publish to NATS
    publishMessage(message);

    res.status(201).json({ message });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
};
