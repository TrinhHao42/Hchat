import { useRef, useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import server from '../configs/server.config';
import '../scss/success.scss';

const Register = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [showForm, setShowForm] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showRePassword, setShowRePassword] = useState(false);

  const emailRef = useRef(null);
  const nameRef = useRef(null);
  const passwordRef = useRef(null);
  const rePasswordRef = useRef(null);

  const [errors, setErrors] = useState({
    email: '',
    name: '',
    password: '',
    repassword: '',
  });

  useEffect(() => {
    const verifyToken = async () => {
      const token = new URLSearchParams(location.search).get('token');
      if (token) {
        setShowForm(false);
        try {
          const response = await axiosInstance.get(`${server.apiGateway}/auth/verify/${token}`);
          setSuccessMessage(response.data.message);
          setTimeout(() => {
            navigate('/auth/login');
          }, 3000);
        } catch (err) {
          setErrorMessage(err.response?.data?.message || 'Lỗi server xác thực');
        }
      }
    };
    verifyToken();
  }, [location.search, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault()

    const email = emailRef.current.value.trim();
    const userName = nameRef.current.value.trim();
    const password = passwordRef.current.value;
    const repassword = rePasswordRef.current.value;

    const newErrors = {
      email: '',
      name: '',
      password: '',
      repassword: '',
    };

    let hasError = false;

    if (!email) {
      newErrors.email = 'Email không được để trống';
      hasError = true;
      emailRef.current.focus();
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Email không hợp lệ';
      hasError = true;
      emailRef.current.focus();
    }

    if (!userName) {
      if (!hasError) nameRef.current.focus();
      newErrors.userName = 'Tên đăng nhập không được để trống';
      hasError = true;
    }

    if (!password) {
      if (!hasError) passwordRef.current.focus();
      newErrors.password = 'Mật khẩu không được để trống';
      hasError = true;
    } else if (password.length < 6) {
      if (!hasError) passwordRef.current.focus();
      newErrors.password = 'Mật khẩu phải có ít nhất 6 ký tự';
      hasError = true;
    }

    if (!repassword) {
      if (!hasError) rePasswordRef.current.focus();
      newErrors.repassword = 'Vui lòng nhập lại mật khẩu';
      hasError = true;
    } else if (password !== repassword) {
      if (!hasError) rePasswordRef.current.focus();
      newErrors.repassword = 'Mật khẩu không khớp';
      hasError = true;
    }

    if (hasError) {
      setErrors(newErrors);
      return;
    }

    setShowForm(false);
    setIsLoading(true);

    try {
      const response = await axios.post(`${server.apiGateway}/auth/register`, {
        email,
        userName,
        password,
      });
      setSuccessMessage(response.data.message);
    } catch (err) {
      setErrorMessage(err.response?.data?.message || 'Lỗi server xác thực');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full bg-[url(/backgroundLogin.jpg)] bg-no-repeat bg-center bg-cover flex justify-center items-center px-4">
      <div className="w-full max-w-md bg-gray-900 bg-opacity-90 rounded-2xl shadow-xl p-8 space-y-6">
        {showForm && !successMessage && !errorMessage ? (
          <>
            <h2 className="text-center text-white text-3xl font-extrabold">Tạo tài khoản</h2>

            <form onSubmit={handleSubmit}>
              <div>
                <label htmlFor="email" className="block text-white mb-1">
                  Email <span className="text-red-400">*</span>
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  ref={emailRef}
                  className="w-full p-3 rounded-lg bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {errors.email && <p className="text-red-400 text-sm mt-1">{errors.email}</p>}
              </div>

              <div>
                <label htmlFor="loginName" className="block text-white mb-1">
                  Tên đăng nhập <span className="text-red-400">*</span>
                </label>
                <input
                  type="text"
                  id="loginName"
                  name="loginName"
                  ref={nameRef}
                  className="w-full p-3 rounded-lg bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {errors.name && <p className="text-red-400 text-sm mt-1">{errors.name}</p>}
              </div>

              <div>
                <div className="flex justify-between">
                  <label htmlFor="password" className="block text-white mb-1">
                    Mật khẩu <span className="text-red-400">*</span>
                  </label>
                  <div className="mt-1 text-sm text-gray-300">
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={showPassword}
                        onChange={() => setShowPassword((prev) => !prev)}
                      />
                      Hiển thị
                    </label>
                  </div>
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  name="password"
                  ref={passwordRef}
                  className="w-full p-3 rounded-lg bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {errors.password && <p className="text-red-400 text-sm mt-1">{errors.password}</p>}
              </div>

              <div>
                <div className="flex justify-between">
                  <label htmlFor="rePassword" className="block text-white mb-1">
                    Nhập lại mật khẩu <span className="text-red-400">*</span>
                  </label>
                  <div className="mt-1 text-sm text-gray-300">
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={showRePassword}
                        onChange={() => setShowRePassword((prev) => !prev)}
                      />
                      Hiển thị
                    </label>
                  </div>
                </div>
                <input
                  type={showRePassword ? 'text' : 'password'}
                  id="rePassword"
                  name="rePassword"
                  ref={rePasswordRef}
                  className="w-full p-3 rounded-lg bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {errors.repassword && <p className="text-red-400 text-sm mt-1">{errors.repassword}</p>}
              </div>

              <div className="space-y-1">
                <button
                  type="submit"
                  className="w-full mt-2 py-3 bg-blue-600 hover:bg-blue-800 transition duration-200 text-white font-bold rounded-lg"
                >
                  Đăng ký
                </button>
                <p className="text-white text-sm text-center">
                  Đã có tài khoản?{' '}
                  <span
                    className="text-blue-400 cursor-pointer text-sm hover:text-blue-200"
                    onClick={() => navigate('/auth/login')}
                  >
                    Đăng nhập
                  </span>
                </p>
              </div>
            </form>
          </>
        ) : (
          <div className="text-center space-y-4">
            {isLoading ? (
              <>
                <svg
                  className="animate-spin h-12 w-12 mx-auto text-white"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  />
                </svg>
                <p className="text-white text-lg">Đang xác thực...</p>
              </>
            ) : successMessage ? (
              <div className="flex flex-col items-center space-y-2">
                <div className="success-checkmark">
                  <div className="check-icon">
                    <span className="icon-line line-tip"></span>
                    <span className="icon-line line-long"></span>
                    <div className="icon-circle"></div>
                    <div className="icon-fix"></div>
                  </div>
                </div>
                <p className="text-green-400 text-lg">{successMessage}</p>
              </div>
            ) : (
              <p className="text-red-400 text-lg">{errorMessage}</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Register;