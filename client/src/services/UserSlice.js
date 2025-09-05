import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { socket } from "./connectSocket";
import axiosInstance from "../configs/axios";

export const logOutUser = createAsyncThunk(
    "user/logout",
    async (_, thunkAPI) => {
        try {
            await axiosInstance("/auth/logout");
            if (socket && socket.connected) {
                socket.disconnect();
            }

            return null;
        } catch (err) {
            return thunkAPI.rejectWithValue(
                err.response?.data || "Lỗi logout"
            );
        }
    }
);


const UserSlice = createSlice({
    name: "user",
    initialState: { user: null },
    reducers: {
        loginUser: (state, action) => {
            state.user = action.payload.user;
        },
        updateUser: (state, action) => {
            state.user = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(logOutUser.fulfilled, (state) => {
            state.user = null;
        });
    },
});

export const { loginUser, updateUser } = UserSlice.actions;
export default UserSlice.reducer;
