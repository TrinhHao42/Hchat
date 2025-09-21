"use client"

import { useEffect } from "react";
import AuthLoading from "../components/AuthLoading";
import { useRouter } from "next/navigation";
import useAuthCheck from "@/hooks/useAuthCheck";

const GuestRouter = ({ children }: { children: React.ReactNode }) => {

  const router = useRouter();

  const {isLoading, isAuthenticated} = useAuthCheck()

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
