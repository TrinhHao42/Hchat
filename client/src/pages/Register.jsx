import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [showRePassword, setShowRePassword] = useState(false);
  const email = useRef("")
  const name = useRef("")
  const password = useRef("")
  const rePassword = useRef("")

  const handleSubmit = (e) => {
    e.preventDefault()
  }

  return (
    <div className='min-h-screen w-full bg-[url(/backgroundLogin.jpg)] bg-no-repeat bg-center bg-cover flex justify-center items-center px-4'>
      <div className='w-full max-w-md bg-gray-900 bg-opacity-90 rounded-2xl shadow-xl p-8 space-y-6'>
        <h2 className='text-center text-white text-3xl font-extrabold'>Tạo tài khoản</h2>

        <form className='space-y-4'>
          <div>
            <label htmlFor='email' className='block text-white mb-1'>
              Email <span className='text-red-400'>*</span>
            </label>
            <input
              type='email'
              id='email'
              name='email'
              ref={email}
              className='w-full p-3 rounded-lg bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-500'
              required
            />
          </div>

          <div>
            <label htmlFor='loginName' className='block text-white mb-1'>
              Tên đăng nhập <span className='text-red-400'>*</span>
            </label>
            <input
              type='text'
              id='loginName'
              name='loginName'
              ref={name}
              className='w-full p-3 rounded-lg bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-500'
              required
            />
          </div>
          <div>
            <div className='flex justify-between'>
              <label htmlFor='password' className='block text-white mb-1'>
                Mật khẩu <span className='text-red-400'>*</span>
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
              id='password'
              name='password'
              ref={password}
              className='w-full p-3 rounded-lg bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-500'
              required
            />
          </div>
          <div>
            <div className='flex justify-between'>
              <label htmlFor='rePassword' className='block text-white mb-1'>
                Nhập lại mật khẩu <span className='text-red-400'>*</span>
              </label>
              <div className="mt-1 text-sm text-gray-300">
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
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
              ref={rePassword}
              className='w-full p-3 rounded-lg bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-500'
              required
            />
          </div>

          <div className='space-y-1'>
            <button
              type='submit'
              className='w-full py-3 bg-blue-600 hover:bg-blue-800 transition duration-200 text-white font-bold rounded-lg'
              onClick={() => handleSubmit()}
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
        </form>
      </div>
    </div>
  );
};

export default Register;
