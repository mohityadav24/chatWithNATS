import mongoose from "mongoose";

const chatSchema = new mongoose.Schema({
  isGroup: {
    type: Boolean,
    default: false
  },

  name: {
    type: String,
    trim: true,
    default: null // for groups
  },

  type: { type: String, enum: ["direct", "group"], required: true },
  participants: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  groupName: String,
 
  admins: [
    { type: mongoose.Schema.Types.ObjectId, ref: "User" }
  ],

  lastMessage: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Message"
  },
 
  unreadCount: {
    type: Map,
    of: Number,
    default: {}
  },
 
  typing: [
    { type: mongoose.Schema.Types.ObjectId, ref: "User" }
  ],
 
  active: [
    { type: mongoose.Schema.Types.ObjectId, ref: "User" }
  ],

  
  avatar: {
    type: String,
    default: null
  }
}, { timestamps: true });

export default mongoose.model("Chat", chatSchema);
