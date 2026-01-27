import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
  chatId: { type: mongoose.Schema.Types.ObjectId, ref: "Chat", required: true },
  sender: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  content: { type: String },
  attachments: [{ type: String }], // URLs for images/files
  type: { type: String, enum: ["text", "image", "file", "voice"], default: "text" },
  status: { type: String, enum: ["sent", "delivered", "seen"], default: "sent" }
}, { timestamps: true });

export default mongoose.model("Message", messageSchema);
