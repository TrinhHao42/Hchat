import React from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import logo from '/logo.png'

const RootLayout = () => {
  const navigate = useNavigate()

  return (
    <div className='flex flex-col w-screen h-screen'>
      <div className='fixed top-0 w-screen px-5 lg:px-15 xl:px-20 py-2 xl:py-5 lg:py-3 flex justify-between items-center'>
        <img src={logo} alt="logo" className='w-15 h-15 cursor-pointer' onClick={() => navigate('/')} />
        <button className='bg-white text-md font-bold px-4 py-2 rounded-lg cursor-pointer' onClick={() => navigate('/login')}>Đăng nhập</button>
      </div>
      <Outlet className='flex-1' />
    </div>
  )
}

export default RootLayout