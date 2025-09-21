'use client'

import UserWebMenu from "@/components/UserMenuWeb";
import UserAndroidMenu from "@/components/UserMenuAndroid";
import ProtectRouter from "@/middleware/ProtectedRouter";
import { useEffect, useState } from "react";
import { connectSocket } from "@/services/connectSocket";
import { useUserStore } from "@/services/store";

const DashBoardLayout = ({ children }: { children: React.ReactNode }) => {
  const { user, isHydrated } = useUserStore();
  const [socketReady, setSocketReady] = useState(false);

  useEffect(() => {
    setSocketReady(false);
    
    if (!isHydrated) {
      return;
    }

    if (!user || !user.U_email) {
      return;
    }

    const timer = setTimeout(() => {
      const socket = connectSocket(
        () => {
          setSocketReady(true);
        },
      );
    }, 100);

    return () => {
      clearTimeout(timer);
      setSocketReady(false);
    };
  }, [isHydrated, user]);

  return (
    <ProtectRouter>
      <div className="flex min-h-screen flex-col md:flex-row">
        <div className="hidden md:block md:w-64 bg-white shadow">
          <UserWebMenu />
        </div>

        <main className="flex-grow bg-gray-100">
          {children}
        </main>

        <div className="block md:hidden fixed bottom-0 left-0 right-0 bg-white shadow">
          <UserAndroidMenu />
        </div>
      </div>
    </ProtectRouter>
  );
};

export default DashBoardLayout;
