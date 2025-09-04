import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { Navigate } from "react-router-dom"
import axiosInstance from "../configs/axios"
import { loginUser, logOutUser } from "../services/UserSlice"
import AuthLoading from "../components/AuthLoading"

const ProtectRouter = ({ children }) => {
    const dispatch = useDispatch()
    const [isAuthenticated, setIsAuthenticated] = useState(null)

    useEffect(() => {
        const checkAuth = async () => {
            try {
                const data = await axiosInstance('/auth/checkAccessToken');
                dispatch(loginUser({ user: data.data }));
                setIsAuthenticated(true);
            } catch (err) {
                // Nếu accessToken hết hạn, thử refresh
                try {
                    const data = await axiosInstance('/auth/refreshAccessToken');
                    dispatch(loginUser({ user: data.data }));
                    setIsAuthenticated(true);
                } catch (refreshErr) {
                    // Nếu refreshToken cũng lỗi thì logout
                    dispatch(logOutUser());
                    setIsAuthenticated(false);
                }
            }
        };
        checkAuth();
    }, [dispatch]);

    if (isAuthenticated === null) {
        return <AuthLoading />;
    }

    if (!isAuthenticated) {
        return <Navigate to="/auth/login" />
    }

    return children
}

export default ProtectRouter
