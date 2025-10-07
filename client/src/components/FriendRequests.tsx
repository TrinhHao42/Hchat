"use client";

import { User } from "@/types/model/User";
import { X, Check, UserPlus } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

interface FriendRequestsProps {
  isOpen: boolean;
  onClose: () => void;
  user: User | null;
}

const FriendRequests: React.FC<FriendRequestsProps> = ({ isOpen, onClose, user }) => {
  const [processingRequests, setProcessingRequests] = useState<Set<string>>(new Set());

  if (!isOpen || !user) return null;

  const friendRequests = user.U_friend_requests?.filter(request => request.status === "pending") || [];

  const handleAcceptRequest = async (userName: string) => {
    if (processingRequests.has(userName)) return;

    setProcessingRequests(prev => new Set(prev).add(userName));
    
    try {
      // TODO: Implement API call to accept friend request
      console.log("Accepting friend request from:", userName);
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // TODO: Update user store after successful API call
      
    } catch (error) {
      console.error("Failed to accept friend request:", error);
    } finally {
      setProcessingRequests(prev => {
        const newSet = new Set(prev);
        newSet.delete(userName);
        return newSet;
      });
    }
  };

  const handleRejectRequest = async (userName: string) => {
    if (processingRequests.has(userName)) return;

    setProcessingRequests(prev => new Set(prev).add(userName));
    
    try {
      // TODO: Implement API call to reject friend request
      console.log("Rejecting friend request from:", userName);
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // TODO: Update user store after successful API call
      
    } catch (error) {
      console.error("Failed to reject friend request:", error);
    } finally {
      setProcessingRequests(prev => {
        const newSet = new Set(prev);
        newSet.delete(userName);
        return newSet;
      });
    }
  };

  return (
    <div className="absolute left-full ml-2 bottom-0 z-50">
      <div className="bg-white rounded-lg w-80 max-h-96 overflow-hidden shadow-xl border border-gray-200">
        {/* Header */}
        <div className="flex items-center justify-between p-3 border-b border-gray-200">
          <div className="flex items-center gap-2">
            <UserPlus className="w-4 h-4 text-blue-600" />
            <h3 className="text-sm font-semibold text-gray-800">
              Lời mời kết bạn ({friendRequests.length})
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 hover:bg-gray-100 rounded-md transition-colors"
          >
            <X className="w-3 h-3 text-gray-500" />
          </button>
        </div>

        {/* Content */}
        <div className="max-h-80 overflow-y-auto">
          {friendRequests.length === 0 ? (
            <div className="p-6 text-center">
              <UserPlus className="w-8 h-8 text-gray-300 mx-auto mb-2" />
              <p className="text-xs text-gray-500">Không có lời mời kết bạn nào</p>
            </div>
          ) : (
            <div className="p-2 space-y-2">
              {friendRequests.map((request, index) => {
                const requestUser = request.from;
                const requestId = requestUser.U_user_name;
                const isProcessing = processingRequests.has(requestId);

                return (
                  <div
                    key={index}
                    className="flex items-center gap-2 p-2 hover:bg-gray-50 rounded-md transition-colors"
                  >
                    {/* Avatar */}
                    <div className="relative flex-shrink-0">
                      <div className="relative w-8 h-8">
                        <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
                          {requestUser.U_avatar ? (
                            <Image
                              src={requestUser.U_avatar}
                              alt="user avatar"
                              width={32}
                              height={32}
                              className="object-cover"
                            />
                          ) : (
                            <div className="w-full h-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold text-xs">
                              {requestUser.U_user_name?.[0]?.toUpperCase()}
                            </div>
                          )}
                        </div>

                        {/* Status indicator */}
                        <span className="absolute bottom-0 right-0 flex items-center justify-center w-2 h-2">
                          <span className="relative inline-flex rounded-full w-2 h-2 bg-gray-400" />
                        </span>
                      </div>
                    </div>

                    {/* User Info */}
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-medium text-gray-800 truncate">
                        {requestUser.U_user_name}
                      </h4>
                      <p className="text-xs text-gray-500">
                        Lời mời kết bạn
                      </p>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-2 flex-shrink-0">
                      <button
                        onClick={() => handleAcceptRequest(requestUser.U_user_name)}
                        disabled={isProcessing}
                        className="flex items-center justify-center w-6 h-6 bg-green-100 hover:bg-green-200 text-green-600 rounded-full transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        title="Chấp nhận"
                      >
                        {isProcessing ? (
                          <div className="w-3 h-3 border-2 border-green-600 border-t-transparent rounded-full animate-spin" />
                        ) : (
                          <Check className="w-3 h-3" />
                        )}
                      </button>
                      
                      <button
                        onClick={() => handleRejectRequest(requestUser.U_user_name)}
                        disabled={isProcessing}
                        className="flex items-center justify-center w-6 h-6 bg-red-100 hover:bg-red-200 text-red-600 rounded-full transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        title="Từ chối"
                      >
                        {isProcessing ? (
                          <div className="w-3 h-3 border-2 border-red-600 border-t-transparent rounded-full animate-spin" />
                        ) : (
                          <X className="w-3 h-3" />
                        )}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FriendRequests;
