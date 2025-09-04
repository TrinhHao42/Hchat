import { Outlet } from 'react-router-dom'

const AuthLayout = () => {
  return (
    <div className='w-screen h-screen'>
      <Outlet />
    </div>
  )
}

export default AuthLayout
