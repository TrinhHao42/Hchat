import { io, Socket } from "socket.io-client";
import server from "../configs/server.config";
import { toast } from "react-hot-toast";

interface ServerToClientEvents {
  connect: () => void;
  userConnect: () => void;
  connect_error: (err: Error) => void;
}

interface ClientToServerEvents {
  
}

let socket: Socket<ServerToClientEvents, ClientToServerEvents> | null = null;

const connectSocket = (onUserConnect: () => void) => {
  if (!socket) {
    socket = io(server.apiGateway, {
      path: "/socket/socket.io",
      withCredentials: true,
      reconnection: true,
    });
  }

  socket.on("connect", () => {
    console.log("✅ Socket connected:", socket?.id);
  });

  socket.on("userConnect", () => {
    onUserConnect();
  });

  socket.on("connect_error", (err: Error) => {
    toast.error(`${err.message}`, {
      duration: 3000,
      position: "top-right",
      style: {
        background: "#EF4444",
        color: "white",
        padding: "16px",
        borderRadius: "10px",
      },
      className: "toast-notification",
    });

    socket?.disconnect();
    socket = null;
  });

  return socket;
};

export { socket, connectSocket };
