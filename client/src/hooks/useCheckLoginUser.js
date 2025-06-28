import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import axios from 'axios'
import { loginUser } from "../services/UserSlice"

const useCheckLoginUser = (url, accessToken) => {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    const dispatch = useDispatch()

    console.log(accessToken)

    useEffect(() => {
        const checkLoginUser = async () => {
            setLoading(true)

            await axios.get(url, {
                headers: {
                    'authorization': accessToken
                }
            })
                .then(data => dispatch(loginUser(user)))
                .catch(error => setError(error))
                .finally(setLoading(false))
        }

        checkLoginUser()
    }, [accessToken, dispatch])

    return {loading, error}
}

export default useCheckLoginUser