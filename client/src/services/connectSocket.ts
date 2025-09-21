import { io, Socket } from "socket.io-client";
import server from "../configs/server.config";
import { toast } from "react-hot-toast";
import { useUserStore } from "./store";

interface ServerToClientEvents {
  connect: () => void;
  userConnect: () => void;
  bitmapUpdated: (data: { status: string; message: string; email: string }) => void;
  bitmapError: (data: { status: string; message: string; error: string }) => void;
  logoutSuccess: (data: { status: string; message: string; email: string }) => void;
  logoutError: (data: { status: string; message: string; error: string }) => void;
  connect_error: (err: Error) => void;
}

interface ClientToServerEvents {
  logout: () => void;
}

let socket: Socket<ServerToClientEvents, ClientToServerEvents> | null = null;

const connectSocket = (
  onUserConnect: () => void = () => {},
  onBitmapUpdated: (data: { status: string; message: string; email: string }) => void = () => {},
  onBitmapError: (data: { status: string; message: string; error: string }) => void = () => {}
) => {
  const user = useUserStore.getState().user
  
  if (socket) {
    console.log("Disconnecting existing socket before creating new one");
    socket.disconnect();
    socket = null;
  }
  
  if (!user || !user.U_email) {
    console.error("Cannot connect socket: user is null or missing email", { user });
    return null;
  }
  
  socket = io(server.apiGateway, {
    path: "/socket/socket.io",
    withCredentials: true,
    reconnection: true,
    auth: {
      user
    }
  });

  socket.on("connect", () => {
  });

  socket.on("userConnect", () => {
    if (typeof onUserConnect === "function") onUserConnect();
  });

  socket.on("bitmapUpdated", (data) => {
    toast.success(data.message, {
      duration: 3000,
      position: "top-right",
      style: {
        background: "#10B981",
        color: "white",
        padding: "16px",
        borderRadius: "10px",
      },
      className: "toast-notification",
    });
    if (typeof onBitmapUpdated === "function") onBitmapUpdated(data);
  });

  socket.on("bitmapError", (data) => {
    toast.error(`${data.message}: ${data.error}`, {
      duration: 5000,
      position: "top-right",
      style: {
        background: "#EF4444",
        color: "white",
        padding: "16px",
        borderRadius: "10px",
      },
      className: "toast-notification",
    });
    if (typeof onBitmapError === "function") onBitmapError(data);
  });

  socket.on("connect_error", (err: Error) => {
    toast.error(`Lỗi kết nối: ${err.message}`, {
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


const disconnectSocket = () => {
  if (socket) {
    socket.emit("logout");
    socket.disconnect();
    socket = null;
  }
};

export { socket, connectSocket, disconnectSocket };