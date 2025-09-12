"use client"

import {
  MessageCircle,
  Users,
  Settings,
  Search,
  LogOut,
} from "lucide-react";
import Link from "next/link";
import UserSheet from "./UserSheet";
import { useUserStore } from "@/services/store";
import { useRouter } from "next/navigation";

const ChatAppMenu = () => {
  const user = useUserStore((state) => state.user);
  const router = useRouter()

  const handleLogout = async() => {
    await useUserStore.getState().logoutAsync()
    router.push("/login")
  }

  return (
    <aside className="h-full w-full bg-gradient-to-b from-slate-50 to-white border-r border-slate-200 flex flex-col shadow-sm">
      <div className="px-2">
        <UserSheet user={user} />

        <div className="mt-3 relative">
          <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Tìm kiếm cuộc trò chuyện..."
            className="w-full pl-9 pr-3 py-2 bg-slate-100 border-0 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all"
          />
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
        <div className="mb-4">
          <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
            Cuộc trò chuyện
          </h3>

          <Link
            href="/chatrooms"
            className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-slate-100 text-slate-700 transition-colors group"
          >
            <MessageCircle className="w-5 h-5 text-slate-500 group-hover:text-blue-500" />
            <span className="font-medium">Tất cả tin nhắn</span>
            <span className="ml-auto bg-blue-500 text-white text-xs px-2 py-0.5 rounded-full">12</span>
          </Link>

          <Link
            href="/groups"
            className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-slate-100 text-slate-700 transition-colors group"
          >
            <Users className="w-5 h-5 text-slate-500 group-hover:text-green-500" />
            <span className="font-medium">Nhóm</span>
            <span className="ml-auto bg-green-500 text-white text-xs px-2 py-0.5 rounded-full">3</span>
          </Link>
        </div>
      </nav>

      {/* Footer Actions */}
      <div className="p-3 border-t border-slate-100 space-y-1 flex-shrink-0">
        <Link
          href="/settings"
          className="flex items-center gap-2 px-2 py-2 rounded-lg hover:bg-slate-100 text-slate-700 transition-colors group"
        >
          <Settings className="w-4 h-4 text-slate-500 group-hover:text-slate-600 flex-shrink-0" />
          <span className="font-medium text-sm truncate">Cài đặt</span>
        </Link>

        <button
          className="cursor-pointer flex items-center gap-2 px-2 py-2 rounded-lg hover:bg-red-50 text-red-600 w-full transition-colors group"
          onClick={() => handleLogout()}
        >
          <LogOut className="w-4 h-4 flex-shrink-0" />
          <span className="font-medium text-sm truncate">Đăng xuất</span>
        </button>
      </div>
    </aside>
  );
};

export default ChatAppMenu;