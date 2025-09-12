"use client";

import { useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { CheckCircle, Loader2, XCircle } from 'lucide-react';
import axiosInstance from '@/configs/axiosInstance';
import Link from 'next/link';

const VerifyRegisterToken = () => {
  const searchParams = useSearchParams();
  const token = searchParams.get('token');
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<any>(null);
  const [data, setData] = useState<any>(null);
  useEffect(() => {
    const verifyRegisterToken = async () => {
      if (!token) {
        setError({ message: 'Token xác thực không hợp lệ hoặc thiếu.' });
        setLoading(false);
        return;
      }

      try {
        const response = await axiosInstance.get(`/auth/verify/${token}`);
        setData(response.data);
        setLoading(false);
      } catch (err: any) {
        const errorMessage = err.response?.data?.message || 'Xác thực thất bại. Vui lòng thử lại.';
        setError({ message: errorMessage });
        setLoading(false);
      }
    };

    verifyRegisterToken();
  }, [token]);

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="bg-white/80 backdrop-blur-sm shadow-xl rounded-2xl w-full max-w-md p-8 flex flex-col items-center text-center">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">Xác thực tài khoản</h1>

        {loading && (
          <div className="flex flex-col items-center gap-3 text-blue-600">
            <Loader2 className="animate-spin h-8 w-8" />
            <p>Đang xác thực tài khoản của bạn...</p>
          </div>
        )}

        {error && (
          <div className="flex flex-col items-center gap-3 text-red-600">
            <XCircle className="h-8 w-8" />
            <p>{error.message}</p>
            <p className="text-sm text-gray-600 mt-2">
              Quay lại <Link href="/register" className="text-indigo-600 hover:text-indigo-700 font-medium">Đăng ký</Link> hoặc{' '}
              <Link href="/login" className="text-indigo-600 hover:text-indigo-700 font-medium">Đăng nhập</Link>
            </p>
          </div>
        )}

        {!loading && !error && data && (
          <div className="flex flex-col items-center gap-3 text-green-600">
            <CheckCircle className="h-8 w-8" />
            <p className="text-lg font-medium">✅ Tài khoản đã được xác thực thành công</p>
            <p className="text-sm text-gray-600 mt-2">
              Vui lòng <Link href="/login" className="text-indigo-600 hover:text-indigo-700 font-medium">Đăng nhập</Link> để tiếp tục.
            </p>
          </div>
        )}

        {!loading && !error && !data && !token && (
          <div className="mt-3 text-gray-500">
            Không có token xác thực để xử lý. Vui lòng kiểm tra lại email của bạn.
            <p className="text-sm text-gray-600 mt-2">
              Quay lại <Link href="/register" className="text-indigo-600 hover:text-indigo-700 font-medium">Đăng ký</Link>.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default VerifyRegisterToken;