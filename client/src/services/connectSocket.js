import { io } from 'socket.io-client'
import Cookies from 'js-cookie'
import server from '../configs/server.config'

const connectSocket = (navigate) => {
    const accessToken = Cookies.get('accessToken')

    const socket = io(server.apiGateway, {
        path: '/socket/socket.io',
        auth: { accessToken },
        reconnection: true
    })

    socket.on('connect', () => {
        alert('Chào mừng bạn đến với HChat')
    })

    socket.on('connect_error', (err) => {
        const connectMessageError = err.message
        alert(`Lỗi: ${connectMessageError}`)
        socket.disconnect()
    })

    socket.on('userConnect', () => {
        navigate('/user/chatroom')
    })
}

export default connectSocket