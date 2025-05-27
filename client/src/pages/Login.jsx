import React from 'react'
import { useNavigate } from 'react-router-dom'

const Login = () => {
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    
  }

  return (
    <div className='min-h-screen w-full bg-[url(/backgroundLogin.jpg)] bg-no-repeat bg-center bg-cover flex justify-center items-center px-4'>
      <div className='w-full max-w-md bg-gray-900 bg-opacity-90 rounded-2xl shadow-xl p-8 space-y-6'>
        <div className='text-center text-white space-y-2'>
          <h2 className='text-3xl font-extrabold'>Chào mừng trở lại!</h2>
          <p className='text-md'>Rất vui khi được gặp lại bạn</p>
        </div>

        <form className='space-y-4'>
          <div>
            <label htmlFor='name' className='block text-white mb-1'>
              Tên đăng nhập
            </label>
            <input
              type='text'
              name='name'
              id='name'
              className='w-full p-3 rounded-lg bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-500'
              required
            />
          </div>

          <div>
            <label htmlFor='password' className='block text-white mb-1'>
              Mật khẩu
            </label>
            <input
              type='password'
              name='password'
              id='password'
              className='w-full p-3 rounded-lg bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-500'
              required
            />
            <p className='text-blue-400 text-sm mt-1 cursor-pointer hover:underline'>
              Quên mật khẩu?
            </p>
          </div>

          <button
            type='submit'
            className='w-full py-3 bg-blue-600 hover:bg-blue-700 transition duration-200 text-white font-bold rounded-lg'
            onClick={(e) => handleSubmit(e)}
          >
            Đăng nhập
          </button>

          <p className='text-center text-gray-400 text-sm'>
            Chưa có tài khoản?{' '}
            <span
              onClick={() => navigate('/register')}
              className='text-blue-400 cursor-pointer hover:underline'
            >
              Đăng ký
            </span>
          </p>
        </form>
      </div>
    </div>
  )
}

export default Login
