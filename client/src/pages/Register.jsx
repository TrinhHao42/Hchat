import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [showRePassword, setShowRePassword] = useState(false);

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
              className='w-full p-3 rounded-lg bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-500'
              required
            />
          </div>

          <div>
            <label htmlFor='displayName' className='block text-white mb-1'>
              Tên hiển thị <span className='text-red-400'>*</span>
            </label>
            <input
              type='text'
              id='displayName'
              name='displayName'
              className='w-full p-3 rounded-lg bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-500'
              required
            />
          </div>

          <div>
            <label htmlFor='password' className='block text-white mb-1'>
              Mật khẩu <span className='text-red-400'>*</span>
            </label>
            <input
              type={showPassword ? 'text' : 'password'}
              id='password'
              name='password'
              className='w-full p-3 rounded-lg bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-500'
              required
            />
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

          <div>
            <label htmlFor='rePassword' className='block text-white mb-1'>
              Nhập lại mật khẩu <span className='text-red-400'>*</span>
            </label>
            <input
              type={showRePassword ? 'text' : 'password'}
              id='rePassword'
              name='rePassword'
              className='w-full p-3 rounded-lg bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-500'
              required
            />
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

          <div className='space-y-1'>
            <button
              type='submit'
              className='w-full py-3 bg-blue-600 hover:bg-blue-700 transition duration-200 text-white font-bold rounded-lg'
              onClick={(e) => handleSubmit(e)}
            >
              Đăng ký
            </button>
            <p className='text-white text-sm'>
              Đã có tài khoản?
              <span className='text-blue-400 cursor-pointer text-sm' onClick={() => navigate('/login')}>
                Đăng nhập
              </span>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
