import { publishNats } from "./nats.service.js";

// Send chat message event
export const sendMessageEvent = (message) => {
  publishNats("chat.send", message);
};