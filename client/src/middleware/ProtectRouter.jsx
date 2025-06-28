import { Navigate } from 'react-router-dom'
import Cookies from 'js-cookie'
import server from '../configs/server.config'
import useCheckLoginUser from '../hooks/useCheckLoginUser'
import useRefreshToken from '../hooks/useRefreshToken'
import { useDispatch } from 'react-redux'
import { logOutUser } from '../services/UserSlice'

const ProtectRouter = ({ children }) => {
    const accessToken = Cookies.get('accessToken')
    const { loading, error } = useCheckLoginUser(`${server.apiGateway}/auth/checkLogin`, accessToken)
    const dispatch = useDispatch()

    if (!loading) {
        if (error) {
            if (error.message === 'Token hết hạn') {
                const refreshToken = Cookies.get('refreshToken')
                const { loading, error } = useRefreshToken(`${server.apiGateway}/auth/refreshAccessToken`, refreshToken)

                if (!loading) {
                    if (error){
                        Cookies.set('accessToken', null)
                        Cookies.set('refreshToken', null)
                        dispatch(logOutUser())
                    }
                }
            }
            else {
                return <Navigate to={'/auth/login'} />
            }
        }

        return children
    }
}

export default ProtectRouter