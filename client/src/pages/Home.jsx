import { useNavigate } from 'react-router-dom'
import logo from '/logo.png'

const Home = () => {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white">
      {/* Header */}
      <div className='fixed top-0 w-screen px-5 lg:px-15 xl:px-20 py-2 xl:py-5 lg:py-3 flex justify-between items-center bg-gray-900/80 backdrop-blur-sm z-[100]'>
        <img src={logo} alt="logo" className='w-15 h-15 cursor-pointer' onClick={() => navigate('/')} />
        <button 
          className='bg-white text-gray-900 text-md font-bold px-4 py-2 rounded-lg cursor-pointer hover:bg-gray-100 transition-colors' 
          onClick={() => navigate('/auth/login')}
        >
          Đăng nhập
        </button>
      </div>

      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="/backgroundLogin.jpg" 
            alt="background" 
            className="w-full h-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-gray-900/70 to-gray-800/70" />
        </div>
        
        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-6">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-teal-400 to-blue-500">
              Kết nối mọi khoảng cách
            </span>
          </h1>
          <p className="text-xl sm:text-2xl text-gray-300 max-w-3xl mx-auto mb-10">
            Chat an toàn, nhanh chóng và dễ dàng với bạn bè và đồng nghiệp qua HChat
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-8 py-4 bg-gradient-to-r from-teal-500 to-blue-500 rounded-full text-lg font-semibold hover:opacity-90 transition-all">
              Bắt đầu ngay
            </button>
            <button className="px-8 py-4 bg-white/10 rounded-full text-lg font-semibold hover:bg-white/20 transition-all">
              Tìm hiểu thêm
            </button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-16">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-teal-400 to-blue-500">
              Tính năng nổi bật
            </span>
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Chat theo thời gian thực",
                description: "Trò chuyện với độ trễ cực thấp, đồng bộ trên mọi thiết bị",
                icon: "🚀"
              },
              {
                title: "Bảo mật tối đa",
                description: "Mã hóa đầu cuối, xác thực hai lớp và kiểm soát quyền riêng tư",
                icon: "🔒"
              },
              {
                title: "Đa nền tảng",
                description: "Sử dụng trên mọi thiết bị với giao diện tối ưu",
                icon: "💻"
              },
              {
                title: "Chia sẻ file dễ dàng",
                description: "Chia sẻ hình ảnh, file và tài liệu một cách nhanh chóng",
                icon: "📁"
              },
              {
                title: "Chat nhóm",
                description: "Tạo nhóm chat cho công việc, học tập hoặc giải trí",
                icon: "👥"
              },
              {
                title: "Tùy biến cao",
                description: "Tùy chỉnh giao diện và thông báo theo ý thích",
                icon: "⚙️"
              }
            ].map((feature, index) => (
              <div 
                key={index}
                className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 hover:transform hover:-translate-y-1 transition-all duration-300"
              >
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                <p className="text-gray-400">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="py-20 bg-gray-800/30">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            {[
              { number: "10M+", label: "Người dùng" },
              { number: "50M+", label: "Tin nhắn mỗi ngày" },
              { number: "99.9%", label: "Thời gian hoạt động" }
            ].map((stat, index) => (
              <div key={index} className="p-6">
                <div className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-teal-400 to-blue-500 mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-400">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-bold mb-8">
            Sẵn sàng để bắt đầu?
          </h2>
          <p className="text-gray-400 mb-8 text-lg">
            Đăng ký miễn phí và trải nghiệm ngay hôm nay
          </p>
          <button className="px-8 py-4 bg-gradient-to-r from-teal-500 to-blue-500 rounded-full text-lg font-semibold hover:opacity-90 transition-all">
            Tạo tài khoản miễn phí
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900/50 backdrop-blur-sm py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h4 className="text-lg font-semibold mb-4">Về HChat</h4>
              <ul className="space-y-2 text-gray-400">
                <li>Giới thiệu</li>
                <li>Blog</li>
                <li>Nghề nghiệp</li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Sản phẩm</h4>
              <ul className="space-y-2 text-gray-400">
                <li>Tính năng</li>
                <li>Bảng giá</li>
                <li>Hỗ trợ</li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Tài nguyên</h4>
              <ul className="space-y-2 text-gray-400">
                <li>Tài liệu</li>
                <li>Hướng dẫn</li>
                <li>API</li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Kết nối</h4>
              <ul className="space-y-2 text-gray-400">
                <li>Twitter</li>
                <li>Facebook</li>
                <li>LinkedIn</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
            <p>© 2025 HChat. Tất cả quyền được bảo lưu.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
