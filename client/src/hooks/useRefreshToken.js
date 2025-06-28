import { useState, useEffect } from "react"
import { useDispatch } from "react-redux"
import Cookies from 'js-cookie'
import { loginUser } from "../services/UserSlice"


const useRefreshToken = (url, refreshToken) => {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    const dispatch = useDispatch()

    useEffect(() => {
        const refreshToken = async () => {
            setLoading(true)

            await axios.get(url, {
                headers: {
                    'authorization': refreshToken
                }
            })
                .then(data => {
                    const { accessToken, user } = data
                    Cookies.set('accessToken', accessToken)

                    dispatch(loginUser(user))
                })
                .catch(error => setError(error))
                .finally(setLoading(false))
        }

        refreshToken()
    }, [refreshToken])

    return {loading, error}
}

export default useRefreshToken