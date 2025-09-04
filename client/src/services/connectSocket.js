import { io } from "socket.io-client"
import server from "../configs/server.config"
import { toast } from 'react-hot-toast'

let socket = null;

const connectSocket = (navigate) => {
  if (!socket) {
    socket = io(server.apiGateway, {
      path: "/socket/socket.io",
      withCredentials: true,
      reconnection: true,
    });
  }

  socket.on("connect", () => {

  })

  socket.on("userConnect", () => {
    navigate("/user/chatroom")
  })

  socket.on("connect_error", (err) => {
    const connectMessageError = err.message
    toast.error(`Lỗi kết nối: ${connectMessageError}`, {
      duration: 3000,
      position: 'top-right',
      style: {
        background: '#EF4444',
        color: 'white',
        padding: '16px',
        borderRadius: '10px',
      },
      className: 'toast-notification',
    });
    socket.disconnect()
  })

  return socket
}

export { socket, connectSocket }