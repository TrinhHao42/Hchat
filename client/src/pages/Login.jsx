import { useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import axios from 'axios'
import server from '../configs/server.config'
import connectSocket from '../services/connectSocket'
import Cookies from 'js-cookie'
import { loginUser } from '../services/UserSlice'

const Login = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const nameRef = useRef("")
  const passwordRef = useRef("")
  const [showPassword, setShowPassword] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      const userName = nameRef.current.value
      const password = passwordRef.current.value

      if (!userName || !password) {
        throw new Error("Vui lòng nhập đầy đủ tên đăng nhập và mật khẩu")
      }

      const { data } = await axios.post(server.apiGateway + "/auth/login", {
        userName, password
      })

      const { user, accessToken, refreshToken } = data

      Cookies.set('accessToken', accessToken)
      Cookies.set('refreshToken', refreshToken)
      dispatch(loginUser({ user }))

      connectSocket(navigate)
    } catch (err) {
      const errorMessage = err.response?.data?.message
      alert(`Lỗi: ${errorMessage}`)
    }
  }


  return (
    <div className='min-h-screen w-full bg-[url(/backgroundLogin.jpg)] bg-no-repeat bg-center bg-cover flex justify-center items-center px-4'>
      <div className='w-full max-w-md bg-gray-900 bg-opacity-90 rounded-2xl shadow-xl p-8 space-y-6'>
        <div className='text-center text-white space-y-2'>
          <h2 className='text-3xl font-extrabold'>Chào mừng trở lại!</h2>
          <p className='text-md'>Rất vui khi được gặp lại bạn</p>
        </div>

        <form action="" onSubmit={handleSubmit}>
          <div>
            <label htmlFor='name' className='block text-white mb-1'>
              Tên đăng nhập
            </label>
            <input
              type='text'
              name='name'
              id='name'
              ref={nameRef}
              className='w-full p-3 rounded-lg bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-500'
              required
            />
          </div>

          <div>
            <div className='flex justify-between'>
              <label htmlFor='password' className='block text-white mb-1'>
                Mật khẩu
              </label>
              <div className="mt-1 text-sm text-gray-300">
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={showPassword}
                    onChange={() => setShowPassword(prev => !prev)}
                  />
                  Hiển thị
                </label>
              </div>
            </div>
            <input
              type={showPassword ? 'text' : 'password'}
              name='password'
              id='password'
              ref={passwordRef}
              className='w-full p-3 rounded-lg bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-500'
              required
            />
            <p className='text-blue-400 text-sm mt-1 cursor-pointer hover:text-blue-200'>
              Quên mật khẩu?
            </p>
          </div>
          <button
            className='w-full py-3 bg-blue-600 hover:bg-blue-800 transition duration-200 text-white font-bold rounded-lg'
            type='submit'
          >
            Đăng nhập
          </button>
        </form>

        <p className='text-center text-gray-400 text-sm'>
          Chưa có tài khoản?{' '}
          <span
            onClick={() => navigate('/auth/register')}
            className='text-blue-400 cursor-pointer hover:text-blue-200'
          >
            &nbsp;Đăng ký
          </span>
        </p>
      </div>
    </div>
  )
}

export default Login
