"use client";

import React, { useState } from 'react';
import { Eye, EyeOff, AlertCircle, CheckCircle, Mail, Lock, User, X } from 'lucide-react';
import { FormData } from '@/types/Props/FormData';
import { InputFieldProps } from '@/types/Props/InputFieldProps';
import { ToastProps } from '@/types/Props/ToastProps';
import Link from 'next/link';
import Image from 'next/image';
import axiosInstance from '@/configs/axiosInstance';

const ErrorToast: React.FC<ToastProps & { onClose: () => void }> = ({ message, type = 'error', onClose }) => {
  const icons = {
    error: <AlertCircle className="h-5 w-5" />,
    success: <CheckCircle className="h-5 w-5" />,
    warning: <AlertCircle className="h-5 w-5" />,
  };

  const colors = {
    error: 'bg-red-50 border-red-200 text-red-800',
    success: 'bg-green-50 border-green-200 text-green-800',
    warning: 'bg-yellow-50 border-yellow-200 text-yellow-800',
  };

  const iconColors = {
    error: 'text-red-500',
    success: 'text-green-500',
    warning: 'text-yellow-500',
  };

  return (
    <div className={`fixed top-4 right-4 z-50 max-w-md p-4 rounded-xl border shadow-lg backdrop-blur-sm animate-in slide-in-from-top-2 ${colors[type]}`}>
      <div className="flex items-center space-x-3">
        <div className={iconColors[type]}>{icons[type]}</div>
        <p className="font-medium flex-1">{message}</p>
        <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors">
          <X className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
};

const InputField: React.FC<InputFieldProps> = ({
  label, type = 'text', value, onChange, error, placeholder, icon: Icon,
  showPassword, onTogglePassword, isPassword = false
}) => (
  <div className="space-y-2">
    <label className="block text-sm font-medium text-gray-700">{label}</label>
    <div className="relative">
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <Icon className="h-5 w-5 text-gray-400" />
      </div>
      <input
        type={isPassword ? (showPassword ? 'text' : 'password') : type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`w-full pl-10 ${isPassword ? 'pr-10' : 'pr-4'} py-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors ${error ? 'border-red-300 bg-red-50' : 'border-gray-300 bg-white hover:border-gray-400'}`}
      />
      {isPassword && (
        <button
          type="button"
          onClick={onTogglePassword}
          className="absolute inset-y-0 right-0 pr-3 flex items-center hover:text-indigo-600 transition-colors"
        >
          {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
        </button>
      )}
    </div>
    {error && (
      <div className="flex items-center space-x-2 text-red-600 text-sm animate-in slide-in-from-top-1">
        <AlertCircle className="h-4 w-4" />
        <span>{error}</span>
      </div>
    )}
  </div>
);

const RegisterPage: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({ email: '', username: '', password: '', confirmPassword: '' });
  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string | null>>>({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [toast, setToast] = useState<ToastProps | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [emailSent, setEmailSent] = useState(false)

  const validateForm = (): boolean => {
    const newErrors: Partial<Record<keyof FormData, string | null>> = {};

    if (!formData.email) newErrors.email = 'Email là bắt buộc';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email không hợp lệ';

    if (!formData.username) newErrors.username = 'Tên người dùng là bắt buộc';
    else if (formData.username.length < 3) newErrors.username = 'Tên người dùng phải có ít nhất 3 ký tự';

    if (!formData.password) newErrors.password = 'Mật khẩu là bắt buộc';
    else if (formData.password.length < 6) newErrors.password = 'Mật khẩu phải có ít nhất 6 ký tự';
    else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(formData.password)) newErrors.password = 'Mật khẩu phải có ít nhất 1 chữ hoa, 1 chữ thường và 1 số';

    if (!formData.confirmPassword) newErrors.confirmPassword = 'Vui lòng nhập lại mật khẩu';
    else if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = 'Mật khẩu không khớp';

    if (!agreedToTerms) {
      setToast({ message: 'Vui lòng đồng ý với điều khoản dịch vụ', type: 'warning' });
      return false;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors(prev => ({ ...prev, [field]: null }));
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    setIsLoading(true);
    setIsSubmitted(true);
    await axiosInstance.post("/auth/register", { 
      email: formData.email, 
      userName: formData.username,
      password: formData.password 
    })
      .then(() => {
        setEmailSent(true);
        setToast({ message: "Đã gửi email xác thực! Vui lòng kiểm tra email của bạn.", type: "success" });
      })
      .catch(err => {
        const msg = err.response?.data?.message || "Đăng ký thất bại";
        setToast({ message: msg, type: "error" });
        setIsSubmitted(false);
      });
    setIsLoading(false);
  };

  const getPasswordStrength = (password: string) => {
    if (password.length === 0) return { strength: 0, text: '', color: '' };
    if (password.length < 6) return { strength: 25, text: 'Yếu', color: 'bg-red-500' };
    if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(password)) return { strength: 50, text: 'Trung bình', color: 'bg-yellow-500' };
    if (password.length >= 8) return { strength: 100, text: 'Mạnh', color: 'bg-green-500' };
    return { strength: 75, text: 'Tốt', color: 'bg-blue-500' };
  };

  const passwordStrength = getPasswordStrength(formData.password);

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      {toast && <ErrorToast {...toast} onClose={() => setToast(null)} />}

      <div className="max-w-md w-full">
        {isSubmitted && !emailSent ? (
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-gray-200 p-8 flex flex-col items-center justify-center min-h-[400px]">
            <div className="animate-spin rounded-full h-12 w-12 border-4 border-indigo-600 border-t-transparent"></div>
            <p className="mt-4 text-lg font-medium text-gray-700">Đang xử lý đăng ký...</p>
            <p className="mt-2 text-sm text-gray-500">Vui lòng đợi trong giây lát.</p>
          </div>
        ) : emailSent ? (
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-gray-200 p-8 flex flex-col items-center justify-center min-h-[400px]">
            <CheckCircle className="h-12 w-12 text-green-500 mb-4" />
            <p className="text-lg font-medium text-gray-700 text-center">Đã gửi email xác thực!</p>
            <p className="mt-2 text-sm text-gray-500 text-center">Vui lòng kiểm tra email của bạn ({formData.email}) để xác thực tài khoản.</p>
            <p className="mt-4 text-sm text-gray-600">
              Đã có tài khoản? <Link href="/login" className="text-indigo-600 hover:text-indigo-700 font-medium">Đăng nhập ngay</Link>
            </p>
          </div>
        ) : (
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-gray-200 p-8">
            <div className="text-center mb-8">
              <Link href="/" className="inline-flex items-center space-x-2 mb-6 hover:opacity-80 transition-opacity">
                <Image src="/images/logo.jpg" alt="Logo" width={48} height={48} />
                <span className="text-2xl font-bold text-gray-900">RazoDo</span>
              </Link>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Tạo tài khoản</h2>
              <p className="text-gray-600">Tham gia cộng đồng chat sôi động</p>
            </div>

            <div className="space-y-6">
              <InputField
                label="Tên người dùng"
                type="text"
                value={formData.username || ""}
                onChange={e => handleInputChange('username', e.target.value)}
                error={errors.username || null}
                placeholder="Tên người dùng"
                icon={User}
              />

              <InputField
                label="Email"
                type="email"
                value={formData.email}
                onChange={e => handleInputChange('email', e.target.value)}
                error={errors.email || null}
                placeholder="your@email.com"
                icon={Mail}
              />

              <div className="space-y-2">
                <InputField
                  label="Mật khẩu"
                  value={formData.password}
                  onChange={e => handleInputChange('password', e.target.value)}
                  error={errors.password || null}
                  placeholder="••••••••"
                  icon={Lock}
                  isPassword
                  showPassword={showPassword}
                  onTogglePassword={() => setShowPassword(!showPassword)}
                />
                {formData.password && (
                  <div className="space-y-1">
                    <div className="flex justify-between text-xs text-gray-600">
                      <span>Độ mạnh mật khẩu</span>
                      <span className={passwordStrength.strength >= 75 ? 'text-green-600' : passwordStrength.strength >= 50 ? 'text-yellow-600' : 'text-red-600'}>
                        {passwordStrength.text}
                      </span>
                    </div>
                    <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div className={`h-full transition-all duration-300 ${passwordStrength.color}`} style={{ width: `${passwordStrength.strength}%` }}></div>
                    </div>
                  </div>
                )}
              </div>

              <InputField
                label="Nhập lại mật khẩu"
                value={formData.confirmPassword || ""}
                onChange={e => handleInputChange('confirmPassword', e.target.value)}
                error={errors.confirmPassword || null}
                placeholder="••••••••"
                icon={Lock}
                isPassword
                showPassword={showConfirmPassword}
                onTogglePassword={() => setShowConfirmPassword(!showConfirmPassword)}
              />

              <div className="flex items-start space-x-3">
                <input type="checkbox" checked={agreedToTerms} onChange={e => setAgreedToTerms(e.target.checked)} className="mt-1 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500" />
                <p className="text-sm text-gray-600 leading-relaxed">
                  Tôi đồng ý với{' '}
                  <Link href="/terms" className="text-indigo-600 hover:text-indigo-700 font-medium">Điều khoản dịch vụ</Link> và{' '}
                  <Link href="/privacy" className="text-indigo-600 hover:text-indigo-700 font-medium">Chính sách bảo mật</Link>
                </p>
              </div>

              <button type="button" onClick={handleSubmit} disabled={isLoading} className="w-full bg-indigo-600 text-white py-3 px-4 rounded-lg hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-all duration-200 font-semibold flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed">
                {isLoading ? <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div> : <><span>Tạo tài khoản</span><User className="h-4 w-4" /></>}
              </button>
            </div>

            <div className="mt-8 text-center">
              <p className="text-gray-600">
                Đã có tài khoản? <Link href="/login" className="text-indigo-600 hover:text-indigo-700 font-medium">Đăng nhập ngay</Link>
              </p>
            </div>
          </div>
        )}

        <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <h4 className="text-sm font-medium text-blue-800 mb-2">Yêu cầu mật khẩu:</h4>
          <ul className="text-sm text-blue-700 space-y-1">
            <li>• Ít nhất 6 ký tự</li>
            <li>• Có ít nhất 1 chữ hoa (A-Z)</li>
            <li>• Có ít nhất 1 chữ thường (a-z)</li>
            <li>• Có ít nhất 1 số (0-9)</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;