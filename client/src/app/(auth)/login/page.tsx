"use client";

import React, { useState, useEffect } from "react";
import { Mail, Lock, ArrowRight } from "lucide-react";
import Link from "next/link";
import InputField from "@/components/InputField";
import Toast from "@/components/Toast";
import { ToastProps } from "@/types/Props/ToastProps";
import { FormData } from "@/types/Props/FormData";
import axiosInstance from "@/configs/axiosInstance";
import { useUserStore } from '@/services/store';
import { useRouter } from "next/navigation";
import Image from "next/image";

const LoginPage: React.FC = () => {
  const router = useRouter();
  const [formData, setFormData] = useState<FormData>({ email: "", password: "", username: null, confirmPassword: null });
  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string | null>>>({});
  const [showPassword, setShowPassword] = useState(false);
  const [toast, setToast] = useState<ToastProps | null>(null);
  const [loading, setLoading] = useState(false);

  const validateForm = (): boolean => {
    const newErrors: Partial<Record<keyof FormData, string | null>> = {};
    if (!formData.email) newErrors.email = "Email là bắt buộc";
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "Email không hợp lệ";

    if (!formData.password) newErrors.password = "Mật khẩu là bắt buộc";
    else if (formData.password.length < 6) newErrors.password = "Mật khẩu phải có ít nhất 6 ký tự";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };


  const handleSubmit = async () => {
    if (!validateForm()) return;

    setLoading(true);
    await axiosInstance.post("/auth/login", { email: formData.email, password: formData.password })
      .then(data => {
        useUserStore.getState().setUser(data.data);
        setToast({ message: "Đăng nhập thành công!", type: "success" });
        router.push("/chatrooms");
      })
      .catch(err => {
        const msg = err.response?.data?.message || "Đăng nhập thất bại";
        setToast({ message: msg, type: "error" });
      });
    setLoading(false);
  };


  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: null }));
  };

  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => setToast(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [toast]);

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}

      <div className="max-w-md w-full">
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-gray-200 p-8">
          <div className="text-center mb-8">
            <Link
              href="/"
              className="inline-flex items-center space-x-2 mb-6 hover:opacity-80 transition-opacity"
            >
              <Image src="/images/logo.jpg" alt="Logo" width={48} height={48} />
              <span className="text-2xl font-bold text-gray-900">RazoDo</span>
            </Link>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Chào mừng trở lại</h2>
            <p className="text-gray-600">Đăng nhập để tiếp tục trò chuyện</p>
          </div>

          <form
            className="space-y-6"
            onSubmit={(e) => {
              e.preventDefault();
              handleSubmit();
            }}
          >
            <InputField
              label="Email"
              type="email"
              value={formData.email}
              onChange={(e) => handleInputChange("email", e.target.value)}
              error={errors.email || null}
              placeholder="your@email.com"
              icon={Mail}
            />

            <InputField
              label="Mật khẩu"
              type="password"
              value={formData.password}
              onChange={(e) => handleInputChange("password", e.target.value)}
              error={errors.password || null}
              placeholder="••••••••"
              icon={Lock}
              isPassword
              showPassword={showPassword}
              onTogglePassword={() => setShowPassword(!showPassword)}
            />

            <div className="flex items-center justify-between">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                />
                <span className="ml-2 text-sm text-gray-600">Ghi nhớ đăng nhập</span>
              </label>
              <Link
                href="/forgot-password"
                className="text-sm text-indigo-600 hover:text-indigo-700 font-medium"
              >
                Quên mật khẩu?
              </Link>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-indigo-600 text-white py-3 px-4 rounded-lg hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-all duration-200 font-semibold flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
              ) : (
                <>
                  <span>Đăng nhập</span>
                  <ArrowRight className="h-4 w-4" />
                </>
              )}
            </button>
          </form>

          <div className="mt-8 text-center">
            <p className="text-gray-600">
              Chưa có tài khoản?{" "}
              <Link
                href="/register"
                className="text-indigo-600 hover:text-indigo-700 font-medium"
              >
                Đăng ký ngay
              </Link>
            </p>
          </div>
        </div>

        <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <p className="text-sm text-blue-800">
            <strong>Demo:</strong> Sử dụng email: <code>nguoila10112004@gmail.com</code> và
            password: <code>Trinhhao123</code> để test đăng nhập thành công.
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
