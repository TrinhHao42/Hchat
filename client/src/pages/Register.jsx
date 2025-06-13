import { useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import server from '../configs/server.config'

const Register = () => {
  const navigate = useNavigate()

  const [showPassword, setShowPassword] = useState(false)
  const [showRePassword, setShowRePassword] = useState(false)

  const emailRef = useRef(null)
  const nameRef = useRef(null)
  const passwordRef = useRef(null)
  const rePasswordRef = useRef(null)

  const [errors, setErrors] = useState({
    email: '',
    name: '',
    password: '',
    repassword: '',
  })

  const handleSubmit = async () => {
    const email = emailRef.current.value.trim()
    const name = nameRef.current.value.trim()
    const password = passwordRef.current.value
    const repassword = rePasswordRef.current.value

    const newErrors = {
      email: '',
      name: '',
      password: '',
      repassword: '',
    }

    let hasError = false

    if (!email) {
      newErrors.email = 'Email không được để trống'
      hasError = true
      emailRef.current.focus()
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Email không hợp lệ'
      hasError = true
      emailRef.current.focus()
    }

    if (!name) {
      if (!hasError) nameRef.current.focus()
      newErrors.name = 'Tên đăng nhập không được để trống'
      hasError = true
    }

    if (!password) {
      if (!hasError) passwordRef.current.focus()
      newErrors.password = 'Mật khẩu không được để trống'
      hasError = true
    } else if (password.length < 6) {
      if (!hasError) passwordRef.current.focus()
      newErrors.password = 'Mật khẩu phải có ít nhất 6 ký tự'
      hasError = true
    }

    if (!repassword) {
      if (!hasError) rePasswordRef.current.focus()
      newErrors.repassword = 'Vui lòng nhập lại mật khẩu'
      hasError = true
    } else if (password !== repassword) {
      if (!hasError) rePasswordRef.current.focus()
      newErrors.repassword = 'Mật khẩu không khớp'
      hasError = true
    }

    if (hasError) {
      setErrors(newErrors)
      return
    }

    await axios.post(`${server.auth}/auth/register`, {
      email,
      name,
      password
    })
  }

  return (
    <div className='min-h-screen w-full bg-[url(/backgroundLogin.jpg)] bg-no-repeat bg-center bg-cover flex justify-center items-center px-4'>
      <div className='w-full max-w-md bg-gray-900 bg-opacity-90 rounded-2xl shadow-xl p-8 space-y-6'>
        <h2 className='text-center text-white text-3xl font-extrabold'>Tạo tài khoản</h2>

        <div>
          <label htmlFor='email' className='block text-white mb-1'>
            Email <span className='text-red-400'>*</span>
          </label>
          <input
            type='email'
            id='email'
            name='email'
            ref={emailRef}
            className='w-full p-3 rounded-lg bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-500'
          />
          {errors.email && <p className='text-red-400 text-sm mt-1'>{errors.email}</p>}
        </div>

        <div>
          <label htmlFor='loginName' className='block text-white mb-1'>
            Tên đăng nhập <span className='text-red-400'>*</span>
          </label>
          <input
            type='text'
            id='loginName'
            name='loginName'
            ref={nameRef}
            className='w-full p-3 rounded-lg bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-500'
          />
          {errors.name && <p className='text-red-400 text-sm mt-1'>{errors.name}</p>}
        </div>

        <div>
          <div className='flex justify-between'>
            <label htmlFor='password' className='block text-white mb-1'>
              Mật khẩu <span className='text-red-400'>*</span>
            </label>
            <div className='mt-1 text-sm text-gray-300'>
              <label className='flex items-center gap-2'>
                <input
                  type='checkbox'
                  checked={showPassword}
                  onChange={() => setShowPassword(prev => !prev)}
                />
                Hiển thị
              </label>
            </div>
          </div>
          <input
            type={showPassword ? 'text' : 'password'}
            id='password'
            name='password'
            ref={passwordRef}
            className='w-full p-3 rounded-lg bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-500'
          />
          {errors.password && <p className='text-red-400 text-sm mt-1'>{errors.password}</p>}
        </div>

        <div>
          <div className='flex justify-between'>
            <label htmlFor='rePassword' className='block text-white mb-1'>
              Nhập lại mật khẩu <span className='text-red-400'>*</span>
            </label>
            <div className='mt-1 text-sm text-gray-300'>
              <label className='flex items-center gap-2'>
                <input
                  type='checkbox'
                  checked={showRePassword}
                  onChange={() => setShowRePassword(prev => !prev)}
                />
                Hiển thị
              </label>
            </div>
          </div>
          <input
            type={showRePassword ? 'text' : 'password'}
            id='rePassword'
            name='rePassword'
            ref={rePasswordRef}
            className='w-full p-3 rounded-lg bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-500'
          />
          {errors.repassword && <p className='text-red-400 text-sm mt-1'>{errors.repassword}</p>}
        </div>

        <div className='space-y-1'>
          <button
            type='submit'
            className='w-full py-3 bg-blue-600 hover:bg-blue-800 transition duration-200 text-white font-bold rounded-lg'
            onClick={handleSubmit}
          >
            Đăng ký
          </button>
          <p className='text-white text-sm'>
            Đã có tài khoản?
            <span className='text-blue-400 cursor-pointer text-sm hover:text-blue-200' onClick={() => navigate('/auth/login')}>
              &nbsp;Đăng nhập
            </span>
          </p>
        </div>
      </div>
    </div>
  )
}

export default Register
