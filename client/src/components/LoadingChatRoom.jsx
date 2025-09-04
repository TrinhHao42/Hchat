
import React from 'react';
import '../styles/loading.css';

const LoadingChatRoom = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50">
      {/* Logo Animation */}
      <div className="relative mb-12">
        {/* Concentric circles animation */}
        <div className="w-32 h-32 rounded-full bg-gradient-to-r from-blue-400 to-blue-600 animate-[spin_4s_linear_infinite] flex items-center justify-center p-1">
          <div className="w-full h-full rounded-full bg-white flex items-center justify-center p-1">
            <div className="w-full h-full rounded-full bg-gradient-to-r from-blue-400 to-blue-600 animate-[spin_3s_linear_infinite_reverse] flex items-center justify-center p-1">
              <div className="w-full h-full rounded-full bg-white flex items-center justify-center text-3xl font-bold text-blue-500">
                H
              </div>
            </div>
          </div>
        </div>

        {/* Flying dots */}
        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 flex space-x-3">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="w-3 h-3 rounded-full bg-blue-500 wave-dot"
              style={{ animationDelay: `${i * 0.2}s` }}
            ></div>
          ))}
        </div>
      </div>

      {/* Text content */}
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold mb-2 bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">
          HChat
        </h2>
        <p className="text-gray-600">
          Vui lòng đợi trong giây lát...
        </p>
      </div>

      {/* Progress bar */}
      <div className="relative w-64 bg-transparent">
        <div className="h-1.5 w-full bg-blue-100 rounded-full overflow-hidden">
          <div className="h-full bg-gradient-to-r from-blue-400 to-blue-600 loading-bar"></div>
        </div>
        {/* Glow effect */}
        <div className="absolute top-0 h-1.5 w-full bg-blue-400/20 rounded-full filter blur-sm"></div>
      </div>

      {/* Loading status */}
      <p className="mt-4 text-sm text-gray-500">
        Đang tải dữ liệu cuộc trò chuyện
      </p>

      {/* Hidden text for preloading fonts */}
      <div className="sr-only font-bold text-2xl">Preload Font</div>
    </div>
  );
};

export default LoadingChatRoom;
