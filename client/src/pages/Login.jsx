import { useRef, useState } from "react"
import { useNavigate } from "react-router-dom"
import { useDispatch } from "react-redux"
import { loginUser } from "../services/UserSlice"
import { connectSocket } from "../services/connectSocket"
import { useCustomToast } from "../hooks/useToast"
import axiosInstance from "../configs/axios"

const Login = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const emailRef = useRef(null)
  const passwordRef = useRef(null)
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const { showToast } = useCustomToast()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const email = emailRef.current.value
      const password = passwordRef.current.value

      if (!email || !password) {
        showToast("Vui lòng nhập đầy đủ email và mật khẩu", "error")
        return;
      }

      const response = await axiosInstance.post("/auth/login", {
        email,
        password,
      })

      dispatch(loginUser({ user: response.data }))
      showToast("Đăng nhập thành công", "success")
      connectSocket(navigate)
      navigate("/")
    } catch (err) {
      if (err.response?.status === 403) {
        const lastLoginTime = new Date(err.response.data.lastLoginTime);
        const minutesRemaining = 5 - Math.floor((new Date() - lastLoginTime) / 1000 / 60);
        showToast(`${err.response.data.message} Thời gian chờ còn lại: ${minutesRemaining} phút`, "error");
      } else {
        const errorMessage = err.response?.data?.message || "Đã xảy ra lỗi khi đăng nhập";
        showToast(errorMessage, "error");
      }
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen w-full bg-[url(/backgroundLogin.jpg)] bg-no-repeat bg-center bg-cover flex justify-center items-center px-4">
      <div className="w-full max-w-md bg-gray-900 bg-opacity-90 rounded-2xl shadow-xl p-8 space-y-6">
        <div className="text-center text-white space-y-2">
          <h2 className="text-3xl font-extrabold"><span className="bg-gradient-to-r from-blue-400 to-teal-400 bg-clip-text text-transparent">Welcome back!</span></h2>
          <p className="text-md">Great to see you again</p>
        </div>



        <form onSubmit={handleSubmit} noValidate>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-white mb-1 font-medium"
            >
              email
            </label>
            <input
              type="text"
              name="email"
              id="email"
              ref={emailRef}
              className="w-full p-3 rounded-lg bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
              aria-required="true"
              aria-describedby="email-error"
            />
          </div>

          <div className="mb-4">
            <div className="flex justify-between">
              <label
                htmlFor="password"
                className="block text-white mb-1 font-medium"
              >
                Password
              </label>
              <div className="mt-1 text-sm text-gray-300">
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={showPassword}
                    onChange={() => setShowPassword((prev) => !prev)}
                  />
                  Show
                </label>
              </div>
            </div>
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              id="password"
              ref={passwordRef}
              className="w-full p-3 rounded-lg bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
              aria-required="true"
              aria-describedby="password-error"
            />
            <p
              className="text-blue-400 text-sm mt-1 cursor-pointer hover:text-blue-200"
              onClick={() => navigate("/auth/forgot-password")}
            >
              Forgot password?
            </p>
          </div>

          <button
            className="w-full py-3 bg-blue-600 hover:bg-blue-800 transition duration-200 text-white font-bold rounded-lg disabled:opacity-50"
            type="submit"
            disabled={isLoading}
          >
            {isLoading ? "Logging in..." : "Log in"}
          </button>
        </form>

        <p className="text-center text-gray-400 text-sm">
          Don’t have an account?{" "}
          <span
            onClick={() => navigate("/auth/register")}
            className="text-blue-400 cursor-pointer hover:text-blue-200"
          >
            Sign up
          </span>
        </p>
      </div>
    </div>
  )
}

export default Login