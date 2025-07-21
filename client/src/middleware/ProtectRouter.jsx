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
            try {
                const response = await axiosInstance('/auth/checkAccessToken')
                dispatch(loginUser({ user: response.data }))
                setIsAuthenticated(true)
            } catch (err) {
                if (err.response?.data?.error === 'invalid_token') {
                    dispatch(logOutUser())
                    setIsAuthenticated(false)
                }
            }
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
