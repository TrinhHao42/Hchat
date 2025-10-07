"use client";

import {
  X,
  User,
  Bell,
  Shield,
  Palette,
  Volume2,
  Camera,
  Save,
  Moon,
  Sun,
  Monitor,
} from "lucide-react";
import { useState, useEffect } from "react";
import { useUserStore } from "@/services/store";

interface SettingModelProps {
  isOpen: boolean;
  onClose: () => void;
}

type Theme = "light" | "dark" | "system";
type Language = "vi" | "en";

const SettingModel: React.FC<SettingModelProps> = ({ isOpen, onClose }) => {
  const user = useUserStore((state) => state.user);
  const [activeTab, setActiveTab] = useState("profile");

  // Profile settings
  const [profileData, setProfileData] = useState({
    displayName: user?.U_user_name || "",
    email: user?.U_email || "",
    bio: "",
    avatar: user?.U_avatar || "",
  });

  // App settings
  const [theme, setTheme] = useState<Theme>("system");
  const [language, setLanguage] = useState<Language>("vi");
  const [notifications, setNotifications] = useState({
    messages: true,
    mentions: true,
    friendRequests: true,
    emailNotifications: false,
  });

  const [privacy, setPrivacy] = useState({
    showOnlineStatus: true,
    allowFriendRequests: true,
    showReadReceipts: true,
  });

  const [sounds, setSounds] = useState({
    messageSound: true,
    notificationSound: true,
    volume: 50,
  });

  useEffect(() => {
    // Load settings from localStorage when component mounts
    const savedTheme = localStorage.getItem("theme") as Theme;
    const savedLanguage = localStorage.getItem("language") as Language;
    
    if (savedTheme) setTheme(savedTheme);
    if (savedLanguage) setLanguage(savedLanguage);
  }, []);

  const handleSaveProfile = () => {
    // TODO: Implement API call to update profile
    console.log("Saving profile:", profileData);
  };

  const handleThemeChange = (newTheme: Theme) => {
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    
    // Apply theme
    if (newTheme === "dark") {
      document.documentElement.classList.add("dark");
    } else if (newTheme === "light") {
      document.documentElement.classList.remove("dark");
    } else {
      // System theme
      const systemDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      if (systemDark) {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
    }
  };

  const tabs = [
    { id: "profile", label: "Hồ sơ", icon: <User className="w-4 h-4" /> },
    { id: "notifications", label: "Thông báo", icon: <Bell className="w-4 h-4" /> },
    { id: "appearance", label: "Giao diện", icon: <Palette className="w-4 h-4" /> },
    { id: "privacy", label: "Bảo mật", icon: <Shield className="w-4 h-4" /> },
    { id: "sounds", label: "Âm thanh", icon: <Volume2 className="w-4 h-4" /> },
  ];

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl w-full max-w-4xl max-h-[90vh] overflow-hidden shadow-2xl border border-gray-200">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-gray-800">Cài đặt</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        <div className="flex h-[600px]">
          {/* Sidebar */}
          <div className="w-64 border-r border-gray-200 bg-gray-50">
            <nav className="p-4 space-y-2">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                    activeTab === tab.id
                      ? "bg-blue-100 text-blue-700 border border-blue-200"
                      : "text-gray-600 hover:bg-gray-100"
                  }`}
                >
                  {tab.icon}
                  <span className="font-medium">{tab.label}</span>
                </button>
              ))}
            </nav>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto">
            {activeTab === "profile" && (
              <div className="p-6 space-y-6">
                <div>
                  <h3 className="text-lg font-semibold mb-4">Thông tin cá nhân</h3>
                  
                  {/* Avatar */}
                  <div className="flex items-center gap-4 mb-6">
                    <div className="relative">
                      <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-2xl font-bold">
                        {profileData.displayName.charAt(0).toUpperCase() || "U"}
                      </div>
                      <button className="absolute bottom-0 right-0 bg-blue-500 text-white p-1.5 rounded-full hover:bg-blue-600 transition-colors">
                        <Camera className="w-3 h-3" />
                      </button>
                    </div>
                    <div>
                      <p className="font-medium text-gray-800">{profileData.displayName || "Chưa có tên"}</p>
                      <p className="text-sm text-gray-500">{profileData.email}</p>
                    </div>
                  </div>

                  {/* Form */}
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Tên hiển thị
                      </label>
                      <input
                        type="text"
                        value={profileData.displayName}
                        onChange={(e) =>
                          setProfileData({ ...profileData, displayName: e.target.value })
                        }
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Nhập tên hiển thị"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Email
                      </label>
                      <input
                        type="email"
                        value={profileData.email}
                        onChange={(e) =>
                          setProfileData({ ...profileData, email: e.target.value })
                        }
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Nhập email"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Tiểu sử
                      </label>
                      <textarea
                        value={profileData.bio}
                        onChange={(e) =>
                          setProfileData({ ...profileData, bio: e.target.value })
                        }
                        rows={3}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Viết một vài dòng về bản thân..."
                      />
                    </div>

                    <button
                      onClick={handleSaveProfile}
                      className="flex items-center gap-2 bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors"
                    >
                      <Save className="w-4 h-4" />
                      Lưu thay đổi
                    </button>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "notifications" && (
              <div className="p-6 space-y-6">
                <h3 className="text-lg font-semibold mb-4">Cài đặt thông báo</h3>
                
                <div className="space-y-4">
                  {Object.entries(notifications).map(([key, value]) => (
                    <div key={key} className="flex items-center justify-between py-2">
                      <div>
                        <p className="font-medium text-gray-800">
                          {key === "messages" && "Tin nhắn mới"}
                          {key === "mentions" && "Được nhắc đến"}
                          {key === "friendRequests" && "Lời mời kết bạn"}
                          {key === "emailNotifications" && "Thông báo email"}
                        </p>
                        <p className="text-sm text-gray-500">
                          {key === "messages" && "Nhận thông báo khi có tin nhắn mới"}
                          {key === "mentions" && "Thông báo khi được nhắc đến trong cuộc trò chuyện"}
                          {key === "friendRequests" && "Thông báo khi có lời mời kết bạn"}
                          {key === "emailNotifications" && "Gửi thông báo qua email"}
                        </p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          className="sr-only peer"
                          checked={value}
                          onChange={(e) =>
                            setNotifications({ ...notifications, [key]: e.target.checked })
                          }
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === "appearance" && (
              <div className="p-6 space-y-6">
                <h3 className="text-lg font-semibold mb-4">Giao diện</h3>
                
                <div className="space-y-6">
                  {/* Theme */}
                  <div>
                    <h4 className="font-medium text-gray-800 mb-3">Chủ đề</h4>
                    <div className="grid grid-cols-3 gap-3">
                      {[
                        { value: "light", label: "Sáng", icon: <Sun className="w-4 h-4" /> },
                        { value: "dark", label: "Tối", icon: <Moon className="w-4 h-4" /> },
                        { value: "system", label: "Hệ thống", icon: <Monitor className="w-4 h-4" /> },
                      ].map((themeOption) => (
                        <button
                          key={themeOption.value}
                          onClick={() => handleThemeChange(themeOption.value as Theme)}
                          className={`flex flex-col items-center gap-2 p-4 border-2 rounded-lg transition-colors ${
                            theme === themeOption.value
                              ? "border-blue-500 bg-blue-50"
                              : "border-gray-200 hover:border-gray-300"
                          }`}
                        >
                          {themeOption.icon}
                          <span className="text-sm font-medium">{themeOption.label}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Language */}
                  <div>
                    <h4 className="font-medium text-gray-800 mb-3">Ngôn ngữ</h4>
                    <select
                      value={language}
                      onChange={(e) => {
                        setLanguage(e.target.value as Language);
                        localStorage.setItem("language", e.target.value);
                      }}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="vi">Tiếng Việt</option>
                      <option value="en">English</option>
                    </select>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "privacy" && (
              <div className="p-6 space-y-6">
                <h3 className="text-lg font-semibold mb-4">Quyền riêng tư & Bảo mật</h3>
                
                <div className="space-y-4">
                  {Object.entries(privacy).map(([key, value]) => (
                    <div key={key} className="flex items-center justify-between py-2">
                      <div>
                        <p className="font-medium text-gray-800">
                          {key === "showOnlineStatus" && "Hiển thị trạng thái trực tuyến"}
                          {key === "allowFriendRequests" && "Cho phép lời mời kết bạn"}
                          {key === "showReadReceipts" && "Hiển thị đã đọc tin nhắn"}
                        </p>
                        <p className="text-sm text-gray-500">
                          {key === "showOnlineStatus" && "Cho phép người khác thấy khi bạn đang online"}
                          {key === "allowFriendRequests" && "Người khác có thể gửi lời mời kết bạn"}
                          {key === "showReadReceipts" && "Người gửi sẽ biết khi bạn đã đọc tin nhắn"}
                        </p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          className="sr-only peer"
                          checked={value}
                          onChange={(e) =>
                            setPrivacy({ ...privacy, [key]: e.target.checked })
                          }
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === "sounds" && (
              <div className="p-6 space-y-6">
                <h3 className="text-lg font-semibold mb-4">Cài đặt âm thanh</h3>
                
                <div className="space-y-6">
                  {/* Sound toggles */}
                  <div className="space-y-4">
                    {Object.entries(sounds).map(([key, value]) => {
                      if (key === "volume") return null;
                      return (
                        <div key={key} className="flex items-center justify-between py-2">
                          <div>
                            <p className="font-medium text-gray-800">
                              {key === "messageSound" && "Âm thanh tin nhắn"}
                              {key === "notificationSound" && "Âm thanh thông báo"}
                            </p>
                            <p className="text-sm text-gray-500">
                              {key === "messageSound" && "Phát âm thanh khi nhận tin nhắn mới"}
                              {key === "notificationSound" && "Phát âm thanh cho các thông báo khác"}
                            </p>
                          </div>
                          <label className="relative inline-flex items-center cursor-pointer">
                            <input
                              type="checkbox"
                              className="sr-only peer"
                              checked={value as boolean}
                              onChange={(e) =>
                                setSounds({ ...sounds, [key]: e.target.checked })
                              }
                            />
                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                          </label>
                        </div>
                      );
                    })}
                  </div>

                  {/* Volume control */}
                  <div>
                    <label className="block font-medium text-gray-800 mb-3">
                      Âm lượng: {sounds.volume}%
                    </label>
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={sounds.volume}
                      onChange={(e) =>
                        setSounds({ ...sounds, volume: parseInt(e.target.value) })
                      }
                      className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingModel;