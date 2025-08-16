import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { Navigate } from "react-router-dom"
import axiosInstance from "../configs/axios"
import { loginUser, logOutUser } from "../services/UserSlice"

const ProtectRouter = ({ children }) => {
    const dispatch = useDispatch()
    const [isAuthenticated, setIsAuthenticated] = useState(null)

    useEffect(() => {
        const checkAuth = async () => {
            await axiosInstance('/auth/checkAccessToken')
                .then(data => {
                    dispatch(loginUser({ user: data.data }))
                    setIsAuthenticated(true)
                })
                .catch(() => {
                    const refreshToken = async () => {
                        await axiosInstance('/auth/refreshAccessToken')
                            .then(data => {
                                dispatch(loginUser({ user: data.data }))
                                setIsAuthenticated(true)
                            })
                            .catch(error => {
                                console.error("Lỗi khi làm mới token:", error)
                            })
                    }
                    
                    refreshToken()
                })
        }

        checkAuth()
    }, [dispatch])

    if (isAuthenticated === null) {
        return <div>Loading...</div>
    }

    if (!isAuthenticated) {
        return <Navigate to="/auth/login" />
    }

    return children
}

export default ProtectRouter
