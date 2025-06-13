import React from 'react'
import { useNavigate } from 'react-router-dom'

const Home = () => {
  const navigate = useNavigate()

  return (
    <div className="text-white flex flex-col">
      <section className="flex flex-1 items-center justify-center text-center px-10 py-20 bg-[url(/backgroundLogin.jpg)] bg-cover bg-center">
        <div className="max-w-3xl">
          <h2 className="text-2xl xl:text-4xl lg:text-3xl font-bold mb-4">Kết nối dễ dàng – Trò chuyện mọi lúc</h2>
          <p className="text-sm lg:text-md xl:text-xl text-gray-300 mb-6">
            HChat giúp bạn giữ liên lạc với bạn bè, đồng nghiệp và gia đình trong một nền tảng đơn giản, bảo mật và dễ sử dụng.
          </p>
        </div>
      </section>

      <section className="bg-gray-900 py-16 px-10">
        <h3 className="xl:text-3xl text-2xl  font-bold text-center mb-12">Tính năng nổi bật</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div className="p-6 bg-gray-800 rounded-lg shadow hover:shadow-lg transition">
            <h4 className="text-xl font-bold mb-2">Giao diện hiện đại</h4>
            <p className="text-gray-400">Thiết kế tối ưu cho trải nghiệm người dùng với chế độ nền tối.</p>
          </div>
          <div className="p-6 bg-gray-800 rounded-lg shadow hover:shadow-lg transition">
            <h4 className="text-xl font-bold mb-2">Bảo mật & riêng tư</h4>
            <p className="text-gray-400">Tin nhắn được mã hóa và bảo vệ tối đa thông tin cá nhân.</p>
          </div>
          <div className="p-6 bg-gray-800 rounded-lg shadow hover:shadow-lg transition">
            <h4 className="text-xl font-bold mb-2">Chat nhóm & riêng tư</h4>
            <p className="text-gray-400">Tạo nhóm, trò chuyện riêng tư hoặc nhóm học tập, làm việc.</p>
          </div>
        </div>
      </section>

      <footer className="bg-gray-800 text-center py-6 text-gray-400 text-sm mt-auto">
        © 2025 ChatConnect. All rights reserved.
      </footer>
    </div>
  )
}

export default Home
