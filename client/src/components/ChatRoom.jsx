import { useState } from 'react'
import background from '/backgroundChatroom.jpg'
import { useLocation, useParams } from 'react-router-dom'
import { useEffect } from 'react'
import { io } from 'socket.io-client'

const ChatRoom = () => {
  const { id } = useParams()
  const location = useLocation()
  const [chatRoom, setChatRoom] = useState(null)

  useEffect(() => {
    const { data } = location.state || {}

    const socket = io("http://localhost:3002", {
      auth: { token: data.token },
    })

    socket.on("connect", () => {
      console.log("Kết nối socket thành công")
    })

    socket.on("connect_error", (err) => {
      console.error("Lỗi kết nối socket:", err.message)
    })

    socket.on("userConnect", (data) => {
      console.log("Sự kiện userConnect:", data)
    })
  })

  return (
    <div className="flex-1 flex flex-col">
      {
        chatRoom && (
          <div className="h-16 bg-gray-800 px-6 flex items-center space-x-5">
            <img src={chatRoom.avatar} alt="avatar" />
            <p className='text-lg'>{chatRoom.name}</p>
          </div>
        )
      }

      <div className="flex-1 p-6 flex flex-col justify-end">
        {
          chatRoom ? (
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Nhập tin nhắn..."
                className="flex-1 p-3 rounded-lg bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg font-semibold">
                Gửi
              </button>
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Nhập tin nhắn..."
                  className="flex-1 p-3 rounded-lg bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg font-semibold">
                  Gửi
                </button>
              </div>
            </div>

          ) : (
            <div className="h-full w-full flex flex-col justify-center items-center">
              <img src={background} alt="background" className='w-100' />
              <p className='text-4xl font-black font-bold bg-linear-20 from-green-700 to-white bg-clip-text text-transparent'>Chọn đoạn chat</p>
            </div>
          )
        }
      </div>
    </div>
  )
}

export default ChatRoom
