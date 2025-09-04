import { createSlice } from "@reduxjs/toolkit"
import axios from '../configs/axios'
import server from '../configs/server.config'
import { socket } from './connectSocket'

const initialValue = {
    user: null
}

const UserSlice = createSlice({
    initialState: initialValue,
    name: "user",
    reducers: {
        loginUser: (state, action) => {
            state.user = action.payload.user
        },
        logOutUser: (state, action) => {
            const currentUser = state.user;
            state.user = null;

            // Disconnect socket
            if (socket && socket.connected) {
                socket.disconnect();
            }

            // Call API to logout
            if (currentUser) {
                axios.post(`${server.apiGateway}/auth/logout`, {
                    email: currentUser.U_email
                }).catch(err => {
                    console.error('Lỗi khi đăng xuất:', err);
                });
            }
        },
        updateUser: (state, action) => {
            state.user = action.payload
        },
    },
})

export const { loginUser, logOutUser, updateUser } = UserSlice.actions
export default UserSlice.reducer