import { createSlice } from "@reduxjs/toolkit"

const initialValue = {
    user: null
}

const UserSlice = createSlice({
    initialState: initialValue,
    name: 'user',
    reducers: {
        loginUser: (state, action) => {
            state.user = action.payload.user
        },
        logOutUser: (state) => {
            state.user = null
        },
        updateUser: (state, action) => {
            state.user = action.user
        }
    }
})

export const { loginUser, logOutUser, updateUser } = UserSlice.actions
export default UserSlice.reducer