import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import axios from "axios"
import { loginUser } from "../services/UserSlice"

const useCheckLoginUser = (url, accessToken) => {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    const [data, setData] = useState(null)

    const dispatch = useDispatch()

    useEffect(() => {
        const checkLoginUser = async () => {
            if (!accessToken) {
                setError("Thiếu token xác thực")
                setLoading(false)
                return
            }

            setLoading(true)
            await axios.get(url, {
                headers: {
                    authorization: `Bearer ${accessToken}`,
                }
            })
                .then(response => {
                    setData(response.data)
                    dispatch(loginUser(response.data))
                })
                .catch(error => {
                    setError(error.response?.data?.message || error.message)
                })
                .finally(setLoading(false))
        }

        checkLoginUser()
    }, [accessToken, dispatch, url])

    return { loading, error, data }
}

export default useCheckLoginUser