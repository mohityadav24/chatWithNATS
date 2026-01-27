import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const mongoURI = "mongodb://localhost:27017/chat-app";
    if (!mongoURI) throw new Error("MONGO_URI is not defined in .env");

    await mongoose.connect(mongoURI, {
      dbName: "chat-app"
    });
    console.log("MongoDB connected");
  } catch (err) {
    console.error("MongoDB connection error:", err.message);
    process.exit(1);
  }
};

export default connectDB;
