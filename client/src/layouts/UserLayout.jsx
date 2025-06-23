import { useEffect, useState } from 'react';
import { FaUserCircle } from 'react-icons/fa';
import { AiOutlineEllipsis } from 'react-icons/ai';
import { FiSearch } from 'react-icons/fi';
import { Outlet } from 'react-router-dom';

const UserLayout = () => {
  const [chatRoom, setChatRoom] = useState([]);
  const [contact, setContact] = useState([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    setChatRoom([
      { name: 'Huy', img: '/avatar1.jpg', lastestMessage: 'Chào bạn' },
      { name: 'Linh', img: '/avatar2.jpg', lastestMessage: 'Tối đi chơi không?' },
    ]);
    setContact([
      { name: 'Dũng', img: '/avatar3.jpg' },
      { name: 'Trang', img: '/avatar4.jpg' },
    ]);
  }, []);

  return (
    <div className="h-screen w-screen flex flex-col bg-gray-900 text-white overflow-hidden md:flex-row">
      {/* Sidebar Toggle Button (Mobile) */}
      <div className="md:hidden p-4 bg-gradient-to-r from-gray-800 to-gray-900 flex justify-between items-center shadow-lg">
        <FaUserCircle className="text-3xl cursor-pointer text-indigo-400" />
        <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="text-white">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
          </svg>
        </button>
      </div>

      {/* Sidebar */}
      <aside
        className={`${
          isSidebarOpen ? 'flex' : 'hidden'
        } md:flex md:w-1/4 lg:w-1/5 bg-gradient-to-b from-gray-800 to-gray-900 p-4 flex-col space-y-6 h-full overflow-y-auto transition-all duration-300 ${
          isSidebarOpen ? 'fixed inset-y-0 left-0 z-50 w-3/4' : ''
        } md:static md:w-1/4 lg:w-1/5 border-r border-gray-700`}
      >
        {/* User Section */}
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center space-x-2">
            <FaUserCircle className="text-4xl text-indigo-400" />
            <span className="text-lg font-semibold text-white">Profile</span>
          </div>
          <div className="md:hidden">
            <button onClick={() => setIsSidebarOpen(false)} className="text-gray-300 hover:text-white">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        {/* Search */}
        <div className="relative mb-6">
          <input
            type="text"
            placeholder="Tìm kiếm đoạn hội thoại..."
            className="w-full p-3 rounded-lg bg-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm placeholder-gray-400 transition duration-200"
          />
          <FiSearch className="absolute top-3 right-3 text-gray-400 hover:text-indigo-400 cursor-pointer" />
        </div>

        {/* Chat Rooms */}
        <div className="flex-1 min-h-0 overflow-y-auto space-y-4 pr-2 scrollbar-thin scrollbar-thumb-indigo-700 scrollbar-track-gray-800">
          {chatRoom.map((room, index) => (
            <div
              key={index}
              className="bg-gray-700 hover:bg-indigo-800 p-3 rounded-lg cursor-pointer flex space-x-3 items-center transition duration-200 transform hover:scale-105"
            >
              <img
                src={room.img}
                alt="avatar"
                className="w-12 h-12 rounded-full object-cover border-2 border-indigo-500"
              />
              <div className="flex-1 truncate">
                <p className="font-semibold text-base text-white truncate">{room.name}</p>
                <p className="text-sm text-gray-300 truncate">{room.lastestMessage}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Contacts */}
        <div className="mt-6">
          <div className="flex justify-between items-center mb-4">
            <p className="text-md font-semibold text-indigo-300">Người liên hệ</p>
            <div className="flex space-x-3 items-center">
              <FiSearch className="cursor-pointer text-lg text-gray-400 hover:text-indigo-400" />
              <AiOutlineEllipsis className="cursor-pointer text-2xl text-gray-400 hover:text-indigo-400" />
            </div>
          </div>
          <div className="max-h-40 overflow-y-auto space-y-4 pr-2 scrollbar-thin scrollbar-thumb-indigo-700 scrollbar-track-gray-800">
            {contact.map((friend, index) => (
              <div
                key={index}
                className="bg-gray-700 hover:bg-indigo-800 p-3 rounded-lg cursor-pointer flex space-x-3 items-center transition duration-200 transform hover:scale-105"
              >
                <img
                  src={friend.img}
                  alt="avatar"
                  className="w-10 h-10 rounded-full object-cover border-2 border-indigo-500"
                />
                <p className="font-semibold text-base text-white truncate">{friend.name}</p>
              </div>
            ))}
          </div>
        </div>
      </aside>

      {/* Main chat area */}
      <main className="flex-1 flex flex-col overflow-y-auto bg-gray-800">
        <Outlet />
      </main>

      {/* Overlay khi sidebar mở trên mobile */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}
    </div>
  );
};

export default UserLayout;