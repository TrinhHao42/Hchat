"use client";

import { useEffect, useState } from "react";
import axiosInstance from "@/configs/axiosInstance";
import { useUserStore } from "@/services/store";
import { useRouter } from "next/navigation";

const ProtectRouter = ({ children }: { children: React.ReactNode }) => {
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
    if (!isLoading && !isAuthenticated) {
      console.log("Redirecting to login...");
      router.push("/login");
    }
  }, [isAuthenticated, isLoading, router]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100">
        <div className="flex flex-col items-center space-y-6 p-8 rounded-2xl bg-white/20 backdrop-blur-lg shadow-2xl">
          {/* Spinner với gradient động và hiệu ứng glow */}
          <div className="relative w-24 h-24">
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 animate-spin shadow-[0_0_20px_rgba(59,130,246,0.6)]"></div>
            <div className="absolute inset-2 rounded-full bg-white"></div>
            <div className="absolute inset-0 border-4 border-t-transparent border-purple-600 rounded-full animate-spin-slow shadow-[0_0_25px_rgba(147,51,234,0.5)]"></div>
          </div>
          {/* Text với hiệu ứng typing và pulse */}
          <p className="text-2xl font-bold text-gray-800 animate-pulse tracking-wide">
            <span className="inline-block loading-text">Đang tải</span>
          </p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) return null;

  return <>{children}</>;
};

export default ProtectRouter;