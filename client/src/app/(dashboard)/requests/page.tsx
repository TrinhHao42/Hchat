"use client";

import { User } from "@/types/model/User";
import { ArrowLeft, Check, X, UserPlus, Users } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useUserStore } from "@/services/store";
import axiosInstance from "@/configs/axiosInstance";

const RequestsPage = () => {
  const router = useRouter();
  const user = useUserStore((state) => state.user);
  const [processingRequests, setProcessingRequests] = useState<Set<string>>(new Set());

  if (!user) {
    router.push("/login");
    return null;
  }

  const friendRequests = user.U_friend_requests?.filter(request => request.status === "pending") || [];

  const handleAcceptRequest = async (senderEmail: string) => {
    if (processingRequests.has(senderEmail)) return;

    setProcessingRequests(prev => new Set(prev).add(senderEmail));
    
    try {
      console.log("Accepting friend request from:", senderEmail);
      
      const response = await axiosInstance.post("/data/api/user/friend-request/accept", {
        userEmail: user.U_email,
        senderEmail: senderEmail
      });

      if (response.data.user) {
        // Update user store with new data
        useUserStore.getState().setUser(response.data.user);
        console.log("Friend request accepted successfully");
      }
      
    } catch (error: any) {
      console.error("Failed to accept friend request:", error);
      
      // Show error message
      if (error.response?.data?.message) {
        alert(error.response.data.message);
      } else {
        alert("Không thể chấp nhận lời mời kết bạn. Vui lòng thử lại.");
      }
    } finally {
      setProcessingRequests(prev => {
        const newSet = new Set(prev);
        newSet.delete(senderEmail);
        return newSet;
      });
    }
  };

  const handleRejectRequest = async (senderEmail: string) => {
    if (processingRequests.has(senderEmail)) return;

    setProcessingRequests(prev => new Set(prev).add(senderEmail));
    
    try {
      console.log("Rejecting friend request from:", senderEmail);
      
      const response = await axiosInstance.post("/data/api/user/friend-request/reject", {
        userEmail: user.U_email,
        senderEmail: senderEmail
      });

      if (response.data.user) {
        // Update user store with new data
        useUserStore.getState().setUser(response.data.user);
        console.log("Friend request rejected successfully");
      }
      
    } catch (error: any) {
      console.error("Failed to reject friend request:", error);
      
      // Show error message
      if (error.response?.data?.message) {
        alert(error.response.data.message);
      } else {
        alert("Không thể từ chối lời mời kết bạn. Vui lòng thử lại.");
      }
    } finally {
      setProcessingRequests(prev => {
        const newSet = new Set(prev);
        newSet.delete(senderEmail);
        return newSet;
      });
    }
  };

  return (
    <div className="h-full bg-gradient-to-b from-slate-50 to-white">
      {/* Header */}
      <div className="flex items-center gap-4 p-6 border-b border-gray-200 bg-white shadow-sm">
        <button
          onClick={() => router.back()}
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <ArrowLeft className="w-5 h-5 text-gray-600" />
        </button>
        
        <div className="flex items-center gap-3">
          <div className="p-2 bg-blue-100 rounded-lg">
            <UserPlus className="w-6 h-6 text-blue-600" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Lời mời kết bạn</h1>
            <p className="text-sm text-gray-500">
              {friendRequests.length > 0 
                ? `${friendRequests.length} lời mời đang chờ xử lý`
                : "Không có lời mời nào"
              }
            </p>
          </div>
        </div>
      </div>
      <div className="p-6">
        {friendRequests.length === 0 ? (
          <div className="text-center py-16">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Users className="w-12 h-12 text-gray-400" />
            </div>
            <h2 className="text-xl font-semibold text-gray-800 mb-2">
              Không có lời mời kết bạn
            </h2>
            <p className="text-gray-500 max-w-md mx-auto">
              Bạn chưa có lời mời kết bạn nào. Khi có người gửi lời mời kết bạn, 
              chúng sẽ hiển thị tại đây để bạn chấp nhận hoặc từ chối.
            </p>
          </div>
        ) : (
          <div className="max-w-3xl mx-auto">
            <div className="grid gap-4">
              {friendRequests.map((request, index) => {
                const requestUser = request.from;
                const requestId = requestUser.U_email;
                const isProcessing = processingRequests.has(requestId);

                return (
                  <div
                    key={index}
                    className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-center gap-4">
                      <div className="relative flex-shrink-0">
                        <div className="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
                          {requestUser.U_avatar ? (
                            <Image
                              src={requestUser.U_avatar}
                              alt="user avatar"
                              width={64}
                              height={64}
                              className="object-cover"
                            />
                          ) : (
                            <div className="w-full h-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold text-xl">
                              {requestUser.U_user_name?.[0]?.toUpperCase()}
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="flex-1 min-w-0">
                        <h3 className="text-lg font-semibold text-gray-800">
                          {requestUser.U_user_name}
                        </h3>
                        <p className="text-sm text-gray-500">
                          {requestUser.U_email}
                        </p>
                        <p className="text-sm text-gray-500 mt-1">
                          Muốn kết bạn với bạn
                        </p>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex gap-3 flex-shrink-0">
                        <button
                          onClick={() => handleAcceptRequest(requestUser.U_email)}
                          disabled={isProcessing}
                          className="flex items-center gap-2 px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          {isProcessing ? (
                            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                          ) : (
                            <Check className="w-4 h-4" />
                          )}
                          <span className="font-medium">Chấp nhận</span>
                        </button>
                        
                        <button
                          onClick={() => handleRejectRequest(requestUser.U_email)}
                          disabled={isProcessing}
                          className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          {isProcessing ? (
                            <div className="w-4 h-4 border-2 border-gray-600 border-t-transparent rounded-full animate-spin" />
                          ) : (
                            <X className="w-4 h-4" />
                          )}
                          <span className="font-medium">Từ chối</span>
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default RequestsPage;