import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import RootLayout from './layouts/RootLayout'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import UserLayout from './layouts/UserLayout'
import ChatRoom from './components/ChatRoom'
import Profile from './components/Profile'
import ProtectRouter from './middleware/protectRouter'

const App = () => {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<RootLayout />}>
          <Route index element={<Home />} />
        </Route>
        <Route path="/auth" element={<RootLayout />}>
          <Route index element={<Navigate to="login" />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
        </Route>
        <Route path="/user" element={
            <UserLayout />
        }>
          <Route index element={<Navigate to="chatroom" />} />
          <Route path="chatroom" element={<ChatRoom />} />
          <Route path="profile" element={<Profile />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
