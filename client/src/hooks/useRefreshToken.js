import { useState, useEffect } from "react"
import { useDispatch } from "react-redux"
import axios from "axios"
import Cookies from "js-cookie"
import { loginUser, logOutUser } from "../services/UserSlice"

const useRefreshToken = (url, refreshToken) => {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    const [data, setData] = useState(null)

    const dispatch = useDispatch()

    useEffect(() => {
        const refreshAccessToken = async () => {
            if (!refreshToken) {
                setError("Thiếu refresh token")
                setLoading(false)
                return
            }

            setLoading(true)

            await axios.get(url, {
                headers: {
                    authorization: `Bearer ${refreshToken}`,
                },
            })
                .then(response => {
                    const { accessToken, user } = response.data
                    setData({ accessToken, user })
                    Cookies.set("accessToken", accessToken)
                    if (user) {
                        dispatch(loginUser(user))
                    }
                })
                .catch(error => {
                    setError(error.response?.data?.message || error.message)
                    // Nếu refreshToken lỗi thì logout
                    dispatch(logOutUser())
                })
                .finally(setLoading(false))
        }
        
        refreshAccessToken()
    }, [refreshToken, dispatch, url])

return { loading, error, data }
}

export default useRefreshToken