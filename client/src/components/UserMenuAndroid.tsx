"use client";

import { Home, MessageCircle, Settings, LogOut, User } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const UserAndroidMenu = () => {
  const pathname = usePathname();

  const menuItems = [
    { label: "Home", href: "/dashboard", icon: <Home className="w-6 h-6" /> },
    { label: "Messages", href: "/messages", icon: <MessageCircle className="w-6 h-6" /> },
    { label: "Settings", href: "/settings", icon: <Settings className="w-6 h-6" /> },
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
    </nav>
  );
};

export default UserAndroidMenu;
