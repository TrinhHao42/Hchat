"use client"

import { useEffect, useState } from "react";
import AuthLoading from "../components/AuthLoading";
import axiosInstance from "@/configs/axiosInstance";
import { useUserStore } from "@/services/store";
import { useRouter } from "next/navigation";

const GuestRouter = ({ children }: { children: React.ReactNode }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const router = useRouter();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await axiosInstance("/auth/checkAccessToken");
        useUserStore.getState().setUser(response.data.user);
        setIsAuthenticated(true);
      } catch (err) {
        try {
          const refreshResponse = await axiosInstance("/auth/refreshAccessToken");
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

  useEffect(() => {
    if (!isLoading && isAuthenticated) {
      router.push("/chatrooms");
    }
  }, [isAuthenticated, isLoading, router]);

  if (isLoading) return <AuthLoading />;

  if (isAuthenticated) return null;

  return <>{children}</>;
};

export default GuestRouter;
