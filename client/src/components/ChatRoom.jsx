import { useState, useEffect } from 'react'
import background from '/backgroundChatroom.jpg'
import LoadingChatRoom from './LoadingChatRoom'

const ChatRoom = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);
  const [chatRoom, setChatRoom] = useState(null);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: "other",
      message: "Chào bạn!",
      time: "09:00",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Felix"
    },
    {
      id: 2,
      sender: "me",
      message: "Xin chào, bạn khỏe không?",
      time: "09:01",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Aneka"
    }
  ]);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!message.trim()) return;

    const newMessage = {
      id: messages.length + 1,
      sender: "me",
      message: message,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Aneka"
    };

    setMessages([...messages, newMessage]);
    setMessage("");
  };

  return (
    <div className="flex-1 flex flex-col bg-gradient-to-b from-gray-900 to-gray-800 text-white w-full h-full relative">
      {isLoading ? (
        <LoadingChatRoom />
      ) : chatRoom ? (
        <>
          {/* Chat Header */}
          <div className="border-b border-gray-700 p-4">
            <div className="flex items-center space-x-4">
              <img
                src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix"
                alt="avatar"
                className="w-10 h-10 rounded-full"
              />
              <div>
                <h3 className="font-semibold">John Doe</h3>
                <span className="text-sm text-green-400">Online</span>
              </div>
            </div>
          </div>

          {/* Chat Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${
                  msg.sender === "me" ? "justify-end" : "justify-start"
                } items-end space-x-2`}
              >
                {msg.sender !== "me" && (
                  <img
                    src={msg.avatar}
                    alt="avatar"
                    className="w-8 h-8 rounded-full"
                  />
                )}
                <div
                  className={`max-w-[70%] ${
                    msg.sender === "me"
                      ? "bg-gradient-to-r from-blue-500 to-blue-600"
                      : "bg-gray-700"
                  } p-3 rounded-2xl ${
                    msg.sender === "me" ? "rounded-br-sm" : "rounded-bl-sm"
                  }`}
                >
                  <p className="text-sm">{msg.message}</p>
                  <span className="text-xs text-gray-300 mt-1 block">
                    {msg.time}
                  </span>
                </div>
                {msg.sender === "me" && (
                  <img
                    src={msg.avatar}
                    alt="avatar"
                    className="w-8 h-8 rounded-full"
                  />
                )}
              </div>
            ))}
          </div>

          {/* Chat Input */}
          <div className="border-t border-gray-700 p-4">
            <form onSubmit={handleSendMessage} className="flex items-center space-x-4">
              <button
                type="button"
                className="text-gray-400 hover:text-gray-300"
              >
                😊
              </button>
              <button
                type="button"
                className="text-gray-400 hover:text-gray-300"
              >
                📎
              </button>
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Nhập tin nhắn..."
                className="flex-1 bg-gray-700 rounded-full px-6 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
              />
              <button
                type="submit"
                className={`p-3 rounded-full ${
                  message.trim()
                    ? "bg-gradient-to-r from-blue-500 to-blue-600 hover:opacity-90"
                    : "bg-gray-700 cursor-not-allowed"
                } transition-all duration-200`}
                disabled={!message.trim()}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 1.414L10.586 9H7a1 1 0 100 2h3.586l-1.293 1.293a1 1 0 101.414 1.414l3-3a1 1 0 000-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            </form>
          </div>
        </>
      ) : (
        <div className="h-full flex flex-col justify-center items-center text-center px-4 space-y-6">
          <div className="w-64 h-64 relative">
            <img
              src={background}
              alt="background"
              className="w-full h-full object-cover rounded-2xl"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-gray-900/90 rounded-2xl" />
          </div>
          <div className="max-w-md">
            <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-teal-400 bg-clip-text text-transparent">
              Bắt đầu cuộc trò chuyện
            </h2>
            <p className="text-gray-400">
              Chọn một người bạn từ danh sách bên trái để bắt đầu cuộc trò chuyện mới
            </p>
          </div>
          <button className="px-6 py-3 bg-gradient-to-r from-blue-500 to-teal-500 rounded-full font-semibold hover:opacity-90 transition-all">
            Tìm bạn mới
          </button>
        </div>
      )}
    </div>
  );
};

export default ChatRoom;

