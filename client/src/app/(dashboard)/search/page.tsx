"use client";

import { useState, useEffect, useCallback } from "react";
import { Search, UserPlus, Users, ArrowLeft, Loader2 } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useUserStore } from "@/services/store";
import axiosInstance from "@/configs/axiosInstance";

interface SearchUser {
  _id: string;
  U_user_name: string;
  U_email: string;
  U_avatar?: string;
}

const SearchPage = () => {
  const router = useRouter();
  const user = useUserStore((state) => state.user);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<SearchUser[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [sendingRequests, setSendingRequests] = useState<Set<string>>(new Set());
  const [hasSearched, setHasSearched] = useState(false);
  const [searchError, setSearchError] = useState<string>("");

  // Debounced search function
  const debouncedSearch = useCallback(
    debounce(async (query: string) => {
      if (!query.trim()) {
        setSearchResults([]);
        setHasSearched(false);
        setSearchError("");
        return;
      }

      setIsSearching(true);
      setSearchError(""); // Clear previous errors
      try {
        const response = await axiosInstance.get(`/data/api/user/search?query=${encodeURIComponent(query)}`);
        
        // Filter out current user from results
        const filteredResults = response.data.filter((searchUser: SearchUser) => 
          searchUser.U_email !== user?.U_email
        );
        
        setSearchResults(filteredResults);
        setHasSearched(true);
      } catch (error: any) {
        console.error("Search error:", error);
        console.error("Error message:", error.message);
        console.error("Error code:", error.code);
        console.error("Request config:", error.config);
        
        // Show user-friendly error message
        if (error.code === 'ERR_NETWORK') {
          console.error("Network error - server might be down or URL incorrect");
          setSearchError("Không thể kết nối đến server. Vui lòng kiểm tra kết nối mạng hoặc thử lại sau.");
        } else {
          setSearchError("Có lỗi xảy ra khi tìm kiếm. Vui lòng thử lại.");
        }
        
        setSearchResults([]);
        setHasSearched(true);
      } finally {
        setIsSearching(false);
      }
    }, 500), // 500ms delay
    [user?.U_email]
  );

  useEffect(() => {
    debouncedSearch(searchQuery);
  }, [searchQuery, debouncedSearch]);

  const handleSendFriendRequest = async (targetUser: SearchUser) => {
    if (!user || sendingRequests.has(targetUser._id)) return;

    setSendingRequests(prev => new Set(prev).add(targetUser._id));

    try {
      await axiosInstance.post("/data/api/user/friend-request", {
        senderEmail: user.U_email,
        receiverEmail: targetUser.U_email
      });
      
    } catch (error: any) {
      console.error("Failed to send friend request:", error);
      
      // Show error message based on response
      if (error.response?.data?.message) {
        alert(error.response.data.message);
      } else {
        alert("Không thể gửi lời mời kết bạn. Vui lòng thử lại.");
      }
    } finally {
      setSendingRequests(prev => {
        const newSet = new Set(prev);
        newSet.delete(targetUser._id);
        return newSet;
      });
    }
  };

  // Check if user is already a friend
  const isAlreadyFriend = (searchUser: SearchUser) => {
    return user?.U_contacts?.some(contact => 
      contact.rememberName === searchUser.U_user_name ||
      contact.chatroomId.toString().includes(searchUser._id)
    ) || false;
  };

  // Check if friend request already sent
  const hasPendingRequest = (searchUser: SearchUser) => {
    return user?.U_friend_requests?.some(request => 
      request.from.U_email === searchUser.U_email && request.status === "pending"
    ) || false;
  };

  return (
    <div className="h-full bg-gradient-to-b from-slate-50 to-white">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 shadow-sm">
        <div className="p-6">
          <div className="flex items-center gap-4 mb-4">
            <button
              onClick={() => router.back()}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <ArrowLeft className="w-5 h-5 text-gray-600" />
            </button>
            
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Users className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-800">Tìm kiếm bạn bè</h1>
                <p className="text-sm text-gray-500">
                  Tìm kiếm và kết nối với bạn bè mới
                </p>
              </div>
            </div>
          </div>

          {/* Search Bar */}
          <div className="relative">
            <Search className="w-5 h-5 absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
            {isSearching && (
              <Loader2 className="w-4 h-4 absolute right-4 top-1/2 transform -translate-y-1/2 text-blue-500 animate-spin" />
            )}
            <input
              type="text"
              placeholder="Tìm kiếm theo tên hoặc email..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-12 py-4 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            />
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        {!hasSearched && !searchQuery ? (
          // Initial State
          <div className="text-center py-16">
            <div className="w-32 h-32 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Search className="w-16 h-16 text-blue-500" />
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-3">
              Tìm kiếm bạn bè
            </h2>
            <p className="text-gray-500 max-w-md mx-auto">
              Nhập tên hoặc email để tìm kiếm và kết nối với bạn bè mới. 
              Kết quả sẽ hiển thị ngay khi bạn nhập.
            </p>
          </div>
        ) : searchError ? (
          // Error State
          <div className="text-center py-16">
            <div className="w-24 h-24 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Users className="w-12 h-12 text-red-400" />
            </div>
            <h2 className="text-xl font-semibold text-gray-800 mb-2">
              Lỗi kết nối
            </h2>
            <p className="text-gray-500 max-w-md mx-auto mb-4">
              {searchError}
            </p>
            <button 
              onClick={() => {
                setSearchError("");
                setHasSearched(false);
              }}
              className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors"
            >
              Thử lại
            </button>
          </div>
        ) : searchResults.length === 0 && hasSearched && !isSearching ? (
          // No Results
          <div className="text-center py-16">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Users className="w-12 h-12 text-gray-400" />
            </div>
            <h2 className="text-xl font-semibold text-gray-800 mb-2">
              Không tìm thấy kết quả
            </h2>
            <p className="text-gray-500 max-w-md mx-auto">
              Không tìm thấy người dùng nào với từ khóa "{searchQuery}". 
              Hãy thử tìm kiếm với từ khóa khác.
            </p>
          </div>
        ) : (
          // Search Results
          <div className="max-w-4xl mx-auto">
            <div className="mb-4">
              <p className="text-sm text-gray-600">
                Tìm thấy {searchResults.length} kết quả cho "{searchQuery}"
              </p>
            </div>
            
            <div className="space-y-3">
              {searchResults.map((searchUser) => {
                const isFriend = isAlreadyFriend(searchUser);
                const hasPending = hasPendingRequest(searchUser);
                const isSending = sendingRequests.has(searchUser._id);

                return (
                  <div
                    key={searchUser._id}
                    className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-center gap-4">
                      {/* Avatar */}
                      <div className="flex-shrink-0">
                        <div className="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
                          {searchUser.U_avatar ? (
                            <Image
                              src={searchUser.U_avatar}
                              alt={searchUser.U_user_name}
                              width={64}
                              height={64}
                              className="object-cover"
                            />
                          ) : (
                            <div className="w-full h-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold text-xl">
                              {searchUser.U_user_name[0]?.toUpperCase()}
                            </div>
                          )}
                        </div>
                      </div>

                      {/* User Info */}
                      <div className="flex-1 min-w-0">
                        <h3 className="text-lg font-semibold text-gray-800 truncate">
                          {searchUser.U_user_name}
                        </h3>
                        <p className="text-sm text-gray-500 truncate">
                          {searchUser.U_email}
                        </p>
                      </div>

                      {/* Action Button */}
                      <div className="flex-shrink-0">
                        {isFriend ? (
                          <span className="flex items-center gap-2 px-4 py-2 bg-green-100 text-green-700 rounded-lg">
                            <Users className="w-4 h-4" />
                            Đã kết bạn
                          </span>
                        ) : hasPending ? (
                          <span className="flex items-center gap-2 px-4 py-2 bg-yellow-100 text-yellow-700 rounded-lg">
                            <UserPlus className="w-4 h-4" />
                            Đã gửi lời mời
                          </span>
                        ) : (
                          <button
                            onClick={() => handleSendFriendRequest(searchUser)}
                            disabled={isSending}
                            className="flex items-center gap-2 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                          >
                            {isSending ? (
                              <Loader2 className="w-4 h-4 animate-spin" />
                            ) : (
                              <UserPlus className="w-4 h-4" />
                            )}
                            <span className="font-medium">
                              {isSending ? "Đang gửi..." : "Kết bạn"}
                            </span>
                          </button>
                        )}
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

// Debounce utility function
function debounce<T extends (...args: any[]) => any>(
  func: T,
  delay: number
): (...args: Parameters<T>) => void {
  let timeoutId: NodeJS.Timeout;
  return (...args: Parameters<T>) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func(...args), delay);
  };
}

export default SearchPage;