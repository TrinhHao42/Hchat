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
        alert(`Lỗi: Tài khoảng đang được đăng nhập`)
    })

    socket.on("userConnect", (res) => {
        navigate(redirectTo, { state: {user} })
    })
}

export default connectSocket