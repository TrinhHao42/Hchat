import Home from '../pages/Home'
import ChatRoom from '../pages/ChatRoom'
import Login from '../pages/Login'
import Register from '../pages/Register'

const router = [
    {
        path: '/',
        page: Home
    },
    {
        path: '/chatroom',
        page: ChatRoom
    },
    {
        path: '/login',
        page: Login
    },
    {
        path: '/register',
        page: Register
    }
]

export default router