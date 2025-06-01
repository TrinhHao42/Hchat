import { io } from 'socket.io-client'
import server from '../configs/server.config'


const connectSocket = (data, navigate) => {
    const { token, user, redirectTo } = data; 

    const socket = io(server.socket, {
        auth: { token: token },
    })

    socket.on("connect", () => {
        console.log("Kết nối socket thành công")
    })

    socket.on("connect_error", (err) => {
        console.error("Lỗi kết nối socket:", err.message)
    })

    socket.on("userConnect", (res) => {
        console.log("Sự kiện userConnect:", res)
        navigate(redirectTo, { state: {user} })
    })
}

export default connectSocket