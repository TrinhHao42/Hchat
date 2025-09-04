import { Outlet } from 'react-router-dom'

const RootLayout = () => {
  return (
    <div className='flex flex-col w-screen h-screen overflow-x-hidden'>
      <Outlet className='flex-1' />
    </div>
  )
}

export default RootLayout