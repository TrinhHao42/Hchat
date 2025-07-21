import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Navigate, Outlet, useLocation } from "react-router-dom"
import axiosInstance from "../configs/axios"
import { loginUser, logOutUser } from "../services/UserSlice"

const ProtectRouter = ({ requireAuth = true }) => {
  const dispatch = useDispatch()
  const [isAuthenticated, setIsAuthenticated] = useState(null)
  const location = useLocation()

  useEffect(() => {
    const checkAuth = async () => {
      await axiosInstance('/auth/checkAccessToken')
        .then(response => {
          dispatch(loginUser({ user: response.data }))
          setIsAuthenticated(true)
        })
        .catch(err => {
          if (err.response?.data?.error === 'invalid_token') {
            dispatch(logOutUser())
            setIsAuthenticated(false)
          }
          else {
            const refreshToken = async () => {
              await axiosInstance('/auth/refreshAccessToken')
                .then(response => {
                  dispatch(loginUser({ user: response.data }))
                  setIsAuthenticated(true)
                })
                .catch(() => {
                  dispatch(logOutUser())
                  setIsAuthenticated(false)
                })
            }

            refreshToken()
          }
        })
    }

    checkAuth()
  }, [dispatch])

  if (isAuthenticated === null) {
    return <div>Loading...</div>
  }

  if (requireAuth && !isAuthenticated) {
    return <Navigate to="/auth/login" replace state={{ from: location }} />
  }

  if (!requireAuth && isAuthenticated) {
    return <Navigate to="/user/chatroom" replace />
  }

  return <Outlet />
}

export default ProtectRouter
