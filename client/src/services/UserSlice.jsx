import { createSlice } from "@reduxjs/toolkit"

const initialValue = {
    user: null
}

const UserSlice = createSlice({
    initialState: initialValue,
    name: 'user',
    reducers: {
        setUser: (state, action) => {
            state.user = action.user
        },
        removeUser: (state) => {
            state.user = null
        },
        updateUser: (state, action) => {
            state.user = action.user
        }
    }
})

export default UserSlice.reducer