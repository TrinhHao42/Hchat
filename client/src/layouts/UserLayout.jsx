import { useState } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import { useContext } from 'react'
import { ThemeContext } from '../App'
import { useSelector } from 'react-redux'
import UserSearch from '../components/UserSearch'
import FriendRequests from '../components/FriendRequests'

const UserLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [showFriendRequests, setShowFriendRequests] = useState(false);
  const { user } = useSelector((state) => state.user.user || {});
  const { theme } = useContext(ThemeContext);
  const navigate = useNavigate();

  return (
    <div className={`h-screen w-screen flex flex-col overflow-hidden md:flex-row ${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'} transition-colors duration-300`}>
      <div className={`md:hidden p-4 ${theme === 'dark' ? 'bg-gray-900/95 border-gray-700/50' : 'bg-white border-gray-200'} backdrop-blur-sm flex justify-between items-center shadow-lg border-b`}>
        <div className="flex items-center space-x-3">
          <img
            src={user?.U_avatar || "https://api.dicebear.com/7.x/avataaars/svg?seed=Aneka"}
            alt="avatar"
            className="w-10 h-10 rounded-full border-2 border-blue-500"
          />
          <span className="font-semibold">{user?.U_user_name || ''}</span>
        </div>
        <button
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="p-2 hover:bg-gray-800 rounded-lg transition-colors"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
          </svg>
        </button>
      </div>

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 w-80 p-4 transition-transform duration-200 ease-in-out z-50 flex flex-col border-r shadow-lg
          ${theme === 'dark' ? 'bg-gray-900/95 border-gray-700/50' : 'bg-white border-gray-200'}
          md:relative md:flex md:translate-x-0
          ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:!translate-x-0`}
      >
        {/* User Profile Section */}
        <div className="flex items-center space-x-4 p-2 mb-6">
          <img
            src={user?.U_avatar || "https://api.dicebear.com/7.x/avataaars/svg?seed=Aneka"}
            alt="avatar"
            className="w-12 h-12 rounded-full border-2 border-blue-500 shadow"
          />
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold truncate">{user?.U_user_name || ''}</h3>
            <span className={`text-xs ${theme === 'dark' ? 'text-green-400' : 'text-green-500'}`}>Online</span>
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => navigate('/user/settings')}
              className={`p-2 rounded-lg transition-colors ${theme === 'dark' ? 'bg-gray-800 hover:bg-gray-700 text-white' : 'bg-gray-200 hover:bg-gray-300 text-gray-900'}`}
              title="Cài đặt"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </button>
          </div>
        </div>
        <div className='flex-1 overflow-y-auto'>
          {!user?.U_contacts?.length && (
          <div className={`text-center py-4 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-400'}`}>
            Không có liên hệ nào. Hãy thêm bạn bè để bắt đầu trò chuyện!
          </div>
        )}
        </div>
        <div>
          {showSearch && <UserSearch />}
          {showFriendRequests && <FriendRequests />}
          <div className={`mt-4 p-4 rounded-xl ${theme === 'dark' ? 'bg-gray-800/30' : 'bg-gray-100'}`}>
            <div className="flex justify-between items-center">
              <button
                onClick={() => {
                  setShowSearch(true);
                  setShowFriendRequests(false);
                }}
                className="p-2 hover:bg-gray-700/50 rounded-lg transition-colors group"
              >
                <svg className="w-5 h-5 text-gray-400 group-hover:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>
              <button
                onClick={() => {
                  setShowFriendRequests(true);
                  setShowSearch(false);
                }}
                className="p-2 hover:bg-gray-700/50 rounded-lg transition-colors group relative"
              >
                <svg className="w-5 h-5 text-gray-400 group-hover:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                {user?.U_friend_requests?.some(req => req.status === 'pending') && (
                  <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
                )}
              </button>
              <button className="p-2 hover:bg-gray-700/50 rounded-lg transition-colors group">
                <svg className="w-5 h-5 text-gray-400 group-hover:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </aside>
      {/* Main Content */}
      <main className={`flex-1 flex flex-col overflow-hidden ${theme === 'dark' ? 'bg-gray-900' : 'bg-white'} transition-colors duration-300`}>
        {/* Outlet sẽ render nội dung của route con như ChatRoom, Profile, Settings */}
        <Outlet />
      </main>
      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 md:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}
    </div>
  );
};

export default UserLayout