import { useEffect, useState } from "react";
import axiosInstance from "@/configs/axiosInstance";
import { useUserStore } from "@/services/store";

const useAuthCheck = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await axiosInstance.get("/auth/checkAccessToken");
        useUserStore.getState().setUser(response.data.user);
        setIsAuthenticated(true);
      } catch (err) {
        try {
          const refreshResponse = await axiosInstance.get("/auth/refreshAccessToken");
          useUserStore.getState().setUser(refreshResponse.data.user);
          setIsAuthenticated(true);
        } catch (refreshErr) {
          setIsAuthenticated(false);
        }
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, []);

  return { isLoading, isAuthenticated };
}

export default useAuthCheck