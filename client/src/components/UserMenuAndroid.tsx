"use client";

import { Home, MessageCircle, Settings, LogOut, User } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useUserStore } from "@/services/store";
import { useState } from "react";
import SettingModel from "./SettingModel";

const UserAndroidMenu = () => {
  const pathname = usePathname();
  const router = useRouter();
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [isSettingOpen, setIsSettingOpen] = useState(false);

  const handleLogout = async() => {
    if (isLoggingOut) return;
    
    setIsLoggingOut(true);
    try {
      await useUserStore.getState().logoutAsync();
      router.push("/login");
    } catch (error) {
      console.error("Logout failed:", error);
      router.push("/login");
    } finally {
      setIsLoggingOut(false);
    }
  };

  const menuItems = [
    { label: "Home", href: "/dashboard", icon: <Home className="w-6 h-6" /> },
    { label: "Messages", href: "/messages", icon: <MessageCircle className="w-6 h-6" /> },
  ];

  return (
    <nav className="flex justify-around items-center h-16 bg-white border-t shadow-md">
      {menuItems.map((item) => {
        const isActive = pathname === item.href;
        return (
          <Link
            key={item.href}
            href={item.href}
            className={`flex flex-col items-center justify-center text-sm ${
              isActive ? "text-blue-600" : "text-gray-600"
            }`}
          >
            {item.icon}
            <span className="mt-1">{item.label}</span>
          </Link>
        );
      })}
      
      {/* Settings button */}
      <button
        onClick={() => setIsSettingOpen(true)}
        className="flex flex-col items-center justify-center text-sm text-gray-600"
      >
        <Settings className="w-6 h-6" />
        <span className="mt-1">Settings</span>
      </button>
      
      {/* Logout button */}
      <button
        onClick={handleLogout}
        disabled={isLoggingOut}
        className="flex flex-col items-center justify-center text-sm text-red-600 disabled:opacity-50"
      >
        {isLoggingOut ? (
          <div className="w-6 h-6 border-2 border-red-600 border-t-transparent rounded-full animate-spin" />
        ) : (
          <LogOut className="w-6 h-6" />
        )}
        <span className="mt-1">{isLoggingOut ? "Logout..." : "Logout"}</span>
      </button>
      
      {/* Settings Modal */}
      <SettingModel 
        isOpen={isSettingOpen} 
        onClose={() => setIsSettingOpen(false)} 
      />
    </nav>
  );
};

export default UserAndroidMenu;
