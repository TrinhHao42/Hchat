"use client";

import { useEffect } from "react";

import { useRouter } from "next/navigation";
import useAuthCheck from "@/hooks/useAuthCheck";

const ProtectRouter = ({ children }: { children: React.ReactNode }) => {
  
  const router = useRouter();

  const {isLoading, isAuthenticated} = useAuthCheck()

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
          <div className="relative w-24 h-24">
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 animate-spin shadow-[0_0_20px_rgba(59,130,246,0.6)]"></div>
            <div className="absolute inset-2 rounded-full bg-white"></div>
            <div className="absolute inset-0 border-4 border-t-transparent border-purple-600 rounded-full animate-spin-slow shadow-[0_0_25px_rgba(147,51,234,0.5)]"></div>
          </div>
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