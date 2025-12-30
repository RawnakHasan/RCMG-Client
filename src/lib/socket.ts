import { serverUrl } from "@/env";
import { io } from "socket.io-client";

export const socket = io(serverUrl, {
  autoConnect: false,
});
