import { Navigate } from "react-router-dom"
import Cookies from "js-cookie"
import server from "../configs/server.config"
import useCheckLoginUser from "../hooks/useCheckLoginUser"
import useRefreshToken from "../hooks/useRefreshToken"
import { useDispatch } from "react-redux"
import { logOutUser } from "../services/UserSlice"

const ProtectRouter = ({ children }) => {
    const accessToken = Cookies.get("accessToken")
    const refreshToken = Cookies.get("refreshToken")

    const { loading: checkLoading, error: checkError, data: checkData } =
        useCheckLoginUser(`${server.apiGateway}/auth/checkAccessToken`, accessToken)

    const { loading: refreshLoading, error: refreshError, data: refreshData } =
        useRefreshToken(`${server.apiGateway}/auth/refreshAccessToken`, refreshToken)
        
    const dispatch = useDispatch()


    if (checkLoading || refreshLoading) {
        return <div>Loading...</div>
    }

    if (checkError) {
        if (checkError === "Token hết hạn" || checkError.includes("expired")) {
            if (refreshError) {
                Cookies.set("accessToken", null)
                Cookies.set("refreshToken", null)
                dispatch(logOutUser())
                return <Navigate to="/auth/login" />
            }
            if (refreshData?.accessToken) {
                Cookies.set("accessToken", refreshData.accessToken)
                return children
            }
        }

        Cookies.set("accessToken", null)
        Cookies.set("refreshToken", null)
        dispatch(logOutUser())
        return <Navigate to="/auth/login" />
    }

    if (checkData) {
        return children
    }

    return <div>Loading...</div>
}

export default ProtectRouter