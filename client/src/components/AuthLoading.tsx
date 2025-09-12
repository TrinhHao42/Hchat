import React from 'react';

const AuthLoading = () => (
  <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100">
    <div className="flex flex-col items-center">
      <div className="relative mb-6">
        <div className="w-16 h-16 rounded-full bg-gradient-to-r from-blue-400 to-blue-600 animate-spin flex items-center justify-center">
          <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center">
            <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-400 to-blue-600 animate-spin flex items-center justify-center">
              <div className="w-4 h-4 rounded-full bg-white"></div>
            </div>
          </div>
        </div>
      </div>
      <h2 className="text-xl font-semibold text-blue-600 mb-2">Đang kiểm tra đăng nhập...</h2>
      <p className="text-gray-500">Vui lòng chờ trong giây lát</p>
    </div>
  </div>
);

export default AuthLoading;