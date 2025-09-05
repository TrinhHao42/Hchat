import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Navigate } from "react-router-dom";
import AuthLoading from "../components/AuthLoading";
import axiosInstance from "../configs/axios";
import { logOutUser, loginUser } from "../services/UserSlice";

const GuestRouter = ({ children }) => {
  const dispatch = useDispatch();
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const user = useSelector((state) => state.user.user?.user);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const data = await axiosInstance('/auth/checkAccessToken');
        dispatch(loginUser({ user: data.data }));
        setIsAuthenticated(true);
      } catch (err) {
        try {
          const data = await axiosInstance('/auth/refreshAccessToken');
          dispatch(loginUser({ user: data.data }));
          setIsAuthenticated(true);
        } catch (refreshErr) {
          dispatch(logOutUser());
          setIsAuthenticated(false);
        }
      }
    };
    checkAuth();
  }, [dispatch]);

  // Đang kiểm tra => loading
  if (isAuthenticated === null) return <AuthLoading />;

  // Nếu đã đăng nhập => redirect sang chatroom
  if (isAuthenticated) return <Navigate to="/user/chatroom" />;

  // Nếu chưa login => cho phép vào guest route
  return children;
};

export default GuestRouter;
