import { connect } from "nats";

let nc;

export const initNats = async () => {
  nc = await connect({ servers: process.env.NATS_URL || "nats://localhost:4222" });
  console.log("Connected to NATS");
  return nc;
};

export const publishMessage = (message) => {
  if (!nc) return console.error("NATS not initialized");
  nc.publish("MESSAGE.NEW", JSON.stringify(message));
};
