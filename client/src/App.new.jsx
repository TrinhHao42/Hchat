import React from 'react';
import Settings from './pages/Settings';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import RootLayout from './layouts/RootLayout'
import AuthLayout from './layouts/AuthLayout'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import UserLayout from './layouts/UserLayout'
import ChatRoom from './components/ChatRoom'
import Profile from './components/Profile'
import ProtectRouter from './middleware/ProtectRouter'
import GuestRouter from './middleware/GuestRouter'
import { createContext, useState, useEffect } from 'react'
import { ThemeModeScript } from 'flowbite-react'

export const ThemeContext = createContext();

const App = () => {
  const getInitialTheme = () => {
    const saved = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    return saved ? saved === 'dark' : prefersDark ? 'dark' : 'light';
  };

  const [theme, setTheme] = useState(getInitialTheme());

  const handleThemeChange = (valueOrEvent) => {
    const newTheme = typeof valueOrEvent === 'string' ? valueOrEvent : valueOrEvent.target.value;
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
  };

  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, handleThemeChange }}>
      <ThemeModeScript />
      <BrowserRouter>
        <Toaster />
        <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300">
          <Routes>
            <Route path="/" element={<RootLayout />}>
              <Route index element={<Home />} />
            </Route>
            <Route path="/auth" element={<AuthLayout />}>
              <Route path="login" element={
                <GuestRouter>
                  <Login />
                </GuestRouter>
              } />
              <Route path="register" element={
                <GuestRouter>
                  <Register />
                </GuestRouter>
              } />
            </Route>
            <Route path="user" element={
              <ProtectRouter>
                <UserLayout />
              </ProtectRouter>
            }>
              <Route index element={<Navigate to="chatroom" />} />
              <Route path="settings" element={<Settings />} />
              <Route path="chatroom" element={<ChatRoom />} />
              <Route path="profile" element={<Profile />} />
            </Route>
          </Routes>
        </div>
      </BrowserRouter>
    </ThemeContext.Provider>
  );
};

export default App;
