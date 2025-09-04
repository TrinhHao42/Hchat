import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import AuthLoading from "../components/AuthLoading";
import axiosInstance from "../configs/axios";

const GuestRouter = ({ children }) => {
  const [checking, setChecking] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const user = useSelector((state) => state.user.user?.user);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        await axiosInstance('/auth/checkAccessToken');
        setIsAuthenticated(true);
      } catch {
        setIsAuthenticated(false);
      } finally {
        setChecking(false);
      }
    };
    checkAuth();
  }, []);

  if (checking) return <AuthLoading />;
  if (isAuthenticated || user) return <Navigate to="/user/chatroom" />;
  return children;
};

export default GuestRouter;
