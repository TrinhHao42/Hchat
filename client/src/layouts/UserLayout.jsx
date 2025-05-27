import { useEffect, useState } from 'react'
import { FaUserCircle } from 'react-icons/fa'
import { AiOutlineEllipsis } from 'react-icons/ai'
import { FiSearch } from 'react-icons/fi'
import { Outlet } from 'react-router-dom'

const UserLayout = () => {
    const [chatRoom, setChatRoom] = useState([])
    const [contact, setContact] = useState([])

    useEffect(() => {
        
    }, [])

    return (
        <div className="h-screen w-screen flex bg-gray-900 text-white">
            <div className="w-1/4 bg-gray-800 p-4 flex flex-col">
                <div className="mb-6">
                    <FaUserCircle className="text-3xl cursor-pointer" />
                </div>

                <div className="relative mb-4 pr-3">
                    <input
                        type="text"
                        placeholder="Tìm kiếm đoạn hội thoại..."
                        className="w-full p-2 rounded-lg bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <FiSearch className="absolute top-3 right-8 text-gray-400" />
                </div>

                <div className="flex-1/2 mb-4 overflow-y-auto space-y-3 pr-1 [&::-webkit-scrollbar]:w-2
                                [&::-webkit-scrollbar-track]:rounded-full
                                [&::-webkit-scrollbar-track]:bg-gray-100
                                [&::-webkit-scrollbar-thumb]:rounded-full
                                [&::-webkit-scrollbar-thumb]:bg-gray-300
                                dark:[&::-webkit-scrollbar-track]:bg-neutral-700">
                    {chatRoom.map((room, index) => (
                        <div
                            key={index}
                            className="bg-gray-700 hover:bg-gray-600 p-2 rounded-lg cursor-pointer transition flex space-x-2 items-center"
                        >
                            <img src={room.img} alt="avatar" className='w-10 h-10 rounded-full' />
                            <div>
                                <p className="font-semibold text-lg">{room.name}</p>
                                <p className="text-sm">{room.lastestMessage}</p>
                            </div>
                        </div>
                    ))}
                </div>
                <div className='flex justify-between pr-4'>
                    <p className='text-md'>Người liên hệ</p>
                    <div className='flex space-x-3 items-center'>
                        <FiSearch className='cursor-pointer text-lg' />
                        <AiOutlineEllipsis className='cursor-pointer text-2xl' />
                    </div>
                </div>
                <div className="flex-1/2 overflow-y-auto space-y-3 mt-3 pr-1 [&::-webkit-scrollbar]:w-2
                                [&::-webkit-scrollbar-track]:rounded-full
                                [&::-webkit-scrollbar-track]:bg-gray-100
                                [&::-webkit-scrollbar-thumb]:rounded-full
                                [&::-webkit-scrollbar-thumb]:bg-gray-300
                                dark:[&::-webkit-scrollbar-track]:bg-neutral-700">
                    {contact.map((friend, index) => (
                        <div
                            key={index}
                            className="bg-gray-700 hover:bg-gray-600 p-2 rounded-lg cursor-pointer transition flex space-x-2 items-center"
                        >
                            <img src={friend.img} alt="avatar" className='w-10 h-10 rounded-full' />
                            <p className="font-semibold text-lg">{friend.name}</p>
                        </div>
                    ))}
                </div>
            </div>
            <Outlet />
        </div>
    )
}

export default UserLayout