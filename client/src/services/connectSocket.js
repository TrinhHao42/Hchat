import { io } from "socket.io-client"
import server from "../configs/server.config"

const connectSocket = (navigate) => {
  const socket = io(server.apiGateway, {
    path: "/socket/socket.io",
    withCredentials: true,
    reconnection: true,
  })

  socket.on("connect", () => {
    alert("Chào mừng bạn đến với HChat")
  })

  socket.on("userConnect", () => {
    navigate("/user/chatroom")
  })

  socket.on("connect_error", (err) => {
    const connectMessageError = err.message
    alert(`Lỗi: ${connectMessageError}`)
    socket.disconnect()
  })

  return socket
}

export default connectSocket