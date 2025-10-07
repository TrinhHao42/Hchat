"use client";

import { useUserStore } from "@/services/store";
import { MessageCircle, Search, Plus, Users, Clock, Circle } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const Chatroom = () => {
  const user = useUserStore((state) => state.user);
  const [searchQuery, setSearchQuery] = useState("");

  // Get contacts from user data
  const contacts = user?.U_contacts || [];
  
  // Filter contacts based on search query
  const filteredContacts = contacts.filter(contact =>
    contact.rememberName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Mock function to get time ago (you can replace with real implementation)
  const getTimeAgo = (timestamp?: string) => {
    if (!timestamp) return "Chưa có tin nhắn";
    // Simple mock - you can implement real time calculation
    return "2 phút trước";
  };

  return (
    <div className="h-full bg-gradient-to-b from-slate-50 to-white">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 shadow-sm">
        <div className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <MessageCircle className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-800">Tin nhắn</h1>
                <p className="text-sm text-gray-500">
                  {contacts.length > 0 
                    ? `${contacts.length} cuộc trò chuyện`
                    : "Chưa có cuộc trò chuyện nào"
                  }
                </p>
              </div>
            </div>
            
            <button className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-colors">
              <Plus className="w-4 h-4" />
              <span className="font-medium">Tạo chat mới</span>
            </button>
          </div>

          {/* Search Bar */}
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Tìm kiếm cuộc trò chuyện..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            />
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        {contacts.length === 0 ? (
          // Empty State
          <div className="text-center py-16">
            <div className="w-32 h-32 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <MessageCircle className="w-16 h-16 text-blue-500" />
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-3">
              Chưa có cuộc trò chuyện nào
            </h2>
            <p className="text-gray-500 max-w-md mx-auto mb-8">
              Bắt đầu cuộc trò chuyện đầu tiên của bạn bằng cách thêm bạn bè 
              hoặc tham gia một nhóm chat.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <button className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg transition-colors">
                <Plus className="w-4 h-4" />
                <span className="font-medium">Tạo chat mới</span>
              </button>
              <Link
                href="/search"
                className="flex items-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-700 px-6 py-3 rounded-lg transition-colors"
              >
                <Users className="w-4 h-4" />
                <span className="font-medium">Tìm bạn bè</span>
              </Link>
            </div>
          </div>
        ) : (
          // Chat List
          <div className="max-w-4xl mx-auto">
            {filteredContacts.length === 0 ? (
              // No search results
              <div className="text-center py-12">
                <Search className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                <p className="text-gray-500">Không tìm thấy cuộc trò chuyện nào</p>
              </div>
            ) : (
              <div className="space-y-2">
                {filteredContacts.map((contact, index) => (
                  <Link
                    key={index}
                    href={`/chatrooms/${contact.chatroomId}`}
                    className="block"
                  >
                    <div className="bg-white rounded-xl border border-gray-200 p-4 hover:shadow-md hover:border-gray-300 transition-all group">
                      <div className="flex items-center gap-4">
                        {/* Avatar */}
                        <div className="relative flex-shrink-0">
                          <div className="w-14 h-14 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
                            {contact.avatarUrl ? (
                              <Image
                                src={contact.avatarUrl}
                                alt={contact.rememberName}
                                width={56}
                                height={56}
                                className="object-cover"
                              />
                            ) : (
                              <div className="w-full h-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold text-lg">
                                {contact.rememberName[0]?.toUpperCase()}
                              </div>
                            )}
                          </div>
                          
                          {/* Status indicator */}
                          <div className="absolute bottom-0 right-0 w-4 h-4 bg-white rounded-full flex items-center justify-center">
                            <Circle 
                              className={`w-3 h-3 ${
                                contact.status === 'online' 
                                  ? 'fill-green-400 text-green-400' 
                                  : contact.status === 'busy'
                                  ? 'fill-red-400 text-red-400'
                                  : contact.status === 'away'
                                  ? 'fill-yellow-400 text-yellow-400'
                                  : 'fill-gray-400 text-gray-400'
                              }`}
                            />
                          </div>
                        </div>

                        {/* Chat Info */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between mb-1">
                            <h3 className="font-semibold text-gray-800 truncate group-hover:text-blue-600 transition-colors">
                              {contact.rememberName}
                            </h3>
                            <span className="text-xs text-gray-400 flex items-center gap-1">
                              <Clock className="w-3 h-3" />
                              {getTimeAgo()}
                            </span>
                          </div>
                          
                          <p className="text-sm text-gray-500 truncate">
                            Nhấn để bắt đầu cuộc trò chuyện...
                          </p>
                          
                          <div className="flex items-center justify-between mt-2">
                            <span className={`text-xs px-2 py-1 rounded-full capitalize ${
                              contact.status === 'online' 
                                ? 'bg-green-100 text-green-600' 
                                : contact.status === 'busy'
                                ? 'bg-red-100 text-red-600'
                                : contact.status === 'away'
                                ? 'bg-yellow-100 text-yellow-600'
                                : 'bg-gray-100 text-gray-600'
                            }`}>
                              {contact.status === 'online' ? 'Trực tuyến' : 
                               contact.status === 'busy' ? 'Bận' :
                               contact.status === 'away' ? 'Vắng mặt' : 'Ngoại tuyến'}
                            </span>
                            
                            {/* Unread indicator */}
                            <div className="w-3 h-3 bg-blue-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Chatroom;
