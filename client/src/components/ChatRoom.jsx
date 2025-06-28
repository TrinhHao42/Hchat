import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import background from '/backgroundChatroom.jpg'

const ChatRoom = () => {
  const [chatRoom, setChatRoom] = useState(null)
  const [message, setMessage] = useState([])

  return (
    <div className="flex-1 flex flex-col bg-gray-900 text-white w-full h-full">

      <div className="flex-1 p-4 md:p-6 flex flex-col justify-end relative">
        {chatRoom ? (
          <>
            <div className="flex-1 overflow-y-auto space-y-3 pr-2 mb-4 scrollbar-thin scrollbar-thumb-gray-600">
              <div className="self-start max-w-[75%] bg-gray-700 p-3 rounded-xl">
                <p className="text-sm">Chào bạn!</p>
              </div>
              <div className="self-end max-w-[75%] bg-blue-600 p-3 rounded-xl">
                <p className="text-sm">Xin chào, bạn khỏe không?</p>
              </div>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault()
              }}
              className="flex gap-3"
            >
              <input
                type="text"
                placeholder="Nhập tin nhắn..."
                className="flex-1 p-3 rounded-lg bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm md:text-base"
              />
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg font-semibold text-sm md:text-base"
              >
                Gửi
              </button>
            </form>
          </>
        ) : (
          <div className="h-full w-full flex flex-col justify-center items-center text-center px-4">
            <img
              src={background}
              alt="background"
              className="w-full max-w-md mb-6 rounded-lg shadow-lg"
            />
            <p className="text-2xl md:text-4xl font-bold bg-gradient-to-r from-green-500 to-white bg-clip-text text-transparent">
              Chọn đoạn chat để bắt đầu
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

export default ChatRoom
