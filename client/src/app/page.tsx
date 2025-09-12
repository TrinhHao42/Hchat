import { Users, Zap, Shield, Heart, ArrowRight } from "lucide-react";
import Link from "next/link";
import NavBar from "@/components/Navbar";
import Footer from "@/components/Footer";

const ChatHomepage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      <NavBar />
      <section className="pt-24 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-6 leading-tight">
              Kết nối mọi lúc
              <span className="block text-indigo-600">mọi nơi</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
              Trải nghiệm chat thời gian thực với công nghệ AI tiên tiến.
              Giao tiếp thông minh, bảo mật tuyệt đối, kết nối không giới hạn.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link
                href="/register"
                className="group bg-indigo-600 text-white px-8 py-4 rounded-xl hover:bg-indigo-700 transition-all duration-300 font-semibold text-lg flex items-center shadow-lg hover:shadow-xl transform hover:-translate-y-1"
              >
                Bắt đầu ngay
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>

          {/* Feature Grid */}
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <Feature
              icon={<Zap className="h-8 w-8 text-indigo-600" />}
              title="Siêu tốc độ"
              description="Tin nhắn được gửi và nhận trong tích tắc với công nghệ WebSocket hiện đại. Không độ trễ, không gián đoạn."
              bg="bg-indigo-100"
            />
            <Feature
              icon={<Shield className="h-8 w-8 text-green-600" />}
              title="Bảo mật tối đa"
              description="Mã hóa end-to-end, dữ liệu được bảo vệ theo tiêu chuẩn quân sự. Quyền riêng tư của bạn là ưu tiên hàng đầu."
              bg="bg-green-100"
            />
            <Feature
              icon={<Users className="h-8 w-8 text-purple-600" />}
              title="Cộng đồng sôi động"
              description="Tham gia hàng triệu người dùng trên toàn thế giới. Tạo group, chia sẻ file, video call không giới hạn."
              bg="bg-purple-100"
            />
          </div>

          {/* CTA */}
          <div className="text-center bg-gradient-to-r from-indigo-600 to-purple-600 rounded-3xl p-12 md:p-16 text-white">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Sẵn sàng trải nghiệm?
            </h2>
            <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
              Tham gia cùng hàng triệu người dùng đang sử dụng ChatVN mỗi ngày.
              Miễn phí, dễ dùng, an toàn.
            </p>
            <Link
              href="/register"
              className="inline-flex items-center bg-white text-indigo-600 px-8 py-4 rounded-xl hover:bg-gray-50 transition-colors font-semibold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            >
              <Heart className="mr-2 h-5 w-5" />
              Tạo tài khoản miễn phí
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

function Feature({
  icon,
  title,
  description,
  bg,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  bg: string;
}) {
  return (
    <div className="group p-8 rounded-2xl bg-white/60 backdrop-blur-sm border border-gray-200 hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
      <div
        className={`${bg} w-16 h-16 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}
      >
        {icon}
      </div>
      <h3 className="text-2xl font-bold text-gray-900 mb-4">{title}</h3>
      <p className="text-gray-600 leading-relaxed">{description}</p>
    </div>
  );
}

export default ChatHomepage;