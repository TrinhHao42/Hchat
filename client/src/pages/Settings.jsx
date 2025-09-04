import { useState, useContext } from 'react';
import { ThemeContext } from '../App';
import { Card, Button, Avatar, TextInput, Label, Select } from 'flowbite-react';
import { User, Mail, Palette, LogOut, Camera, Save, Shield, Moon, Sun, Key } from 'lucide-react';
import { useSelector } from 'react-redux';

const SettingsPage = () => {
    const { user } = useSelector((state) => state.user.user || {});
    const { theme, handleThemeChange } = useContext(ThemeContext);
    const [displayName, setDisplayName] = useState(user?.U_user_name || '');
    const [avatar, setAvatar] = useState(user?.U_avatar || 'https://api.dicebear.com/7.x/avataaars/svg?seed=Aneka');

    const handleAvatarChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setAvatar(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleNameChange = (e) => setDisplayName(e.target.value);

    const handleSaveName = () => {
        alert('Tên đã được cập nhật!');
    };

    const handleChangePassword = () => {
        alert('Chuyển đến trang đổi mật khẩu!');
    };

    const handleLogout = () => {
        alert('Đăng xuất thành công!');
    };

    return (
        <div className="min-h-screen py-8 px-4 overflow-auto">
            <div className="max-w-4xl mx-auto grid gap-6">
                {/* Profile Section */}
                <Card className='bg-primary-600 dark:bg-primary-300'>
                    <div className="flex items-center gap-4 mb-4">
                        <div className="p-2 rounded-lg">
                            <User className="w-5 h-5 text-primary-600 dark:text-primary-300" />
                        </div>
                        <h2 className="text-2xl font-bold text-primary-600 dark:text-primary-300">
                            Thông tin cá nhân
                        </h2>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                        {/* Avatar */}
                        <div className="flex flex-col items-center">
                            <div className="relative group">
                                <Avatar
                                    size="xl"
                                    img={avatar}
                                    alt="User avatar"
                                    className="w-32 h-32 ring-4 ring-primary-500/30 dark:ring-primary-400/30"
                                />
                                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center">
                                    <div className="text-center">
                                        <Camera className="w-6 h-6 text-white mx-auto mb-1" />
                                        <span className="text-white text-xs">Thay đổi</span>
                                    </div>
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={handleAvatarChange}
                                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                    />
                                </div>
                            </div>
                            <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                                Nhấp vào ảnh để thay đổi
                            </p>
                        </div>

                        {/* Info Fields */}
                        <div className="space-y-4">
                            <div>
                                <Label htmlFor="displayName" value="Tên hiển thị" />
                                <div className="flex gap-2 mt-2">
                                    <TextInput
                                        id="displayName"
                                        value={displayName}
                                        onChange={handleNameChange}
                                        className="flex-1"
                                    />
                                    <Button onClick={handleSaveName} className="px-4 text-primary-600 dark:text-primary-300">
                                        <Save className="w-4 h-4 mr-2" />
                                        Lưu
                                    </Button>
                                </div>
                            </div>

                            <div>
                                <Label htmlFor="email" value="Địa chỉ Email" className="flex items-center gap-2">
                                    <Mail className="w-4 h-4" />
                                    Email
                                </Label>
                                <div className="mt-2 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600 flex items-center justify-between">
                                    <span className="text-gray-700 dark:text-gray-300">
                                        {user?.U_email}
                                    </span>
                                    <span className="px-2 py-1 text-xs bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300 rounded-full">
                                        Đã xác thực
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </Card>

                {/* Theme & Security Section */}
                <div className="grid md:grid-cols-2 gap-6">
                    {/* Theme Card */}
                    <Card className='bg-primary-600 dark:bg-primary-300'>
                        <div className="flex items-center gap-3 mb-4">
                            <div className="p-2 rounded-lg bg-secondary-100 dark:bg-secondary-900">
                                <Palette className="w-5 h-5 text-secondary-600 dark:text-secondary-300" />
                            </div>
                            <h3 className="text-lg font-bold text-secondary-600 dark:text-secondary-300">
                                Giao diện
                            </h3>
                        </div>

                        <div className="flex items-center gap-3">
                            <Select
                                id="theme"
                                value={theme}
                                onChange={(e) => handleThemeChange(e.target.value)}
                                className="w-full 
                                        text-gray-900 border-gray-300"
                            >
                                <option value="light">Chế độ sáng</option>
                                <option value="dark">Chế độ tối</option>
                            </Select>

                            <div className="flex-shrink-0">
                                {theme === 'light' ? (
                                    <Sun className="w-5 h-5 text-yellow-500" />
                                ) : (
                                    <Moon className="w-5 h-5 text-blue-500" />
                                )}
                            </div>
                        </div>
                    </Card>

                    {/* Security Card */}
                    <Card className='bg-primary-600 dark:bg-primary-300'>
                        <div className="flex items-center gap-3 mb-4">
                            <div className="p-2 rounded-lg bg-green-100 dark:bg-green-900">
                                <Shield className="w-5 h-5 text-green-600 dark:text-green-300" />
                            </div>
                            <h3 className="text-lg font-bold text-green-500 dark:text-green-100">
                                Bảo mật
                            </h3>
                        </div>

                        <div className="space-y-4 grid grid-cols-2">
                            <Button
                                color="warning"
                                onClick={handleChangePassword}
                                className="w-full"
                            >
                                <Key className="w-5 h-5 mr-2" />
                                Đổi mật khẩu
                            </Button>

                            <Button
                                color="failure"
                                onClick={handleLogout}
                                className="w-full"
                            >
                                <LogOut className="w-5 h-5 mr-2" />
                                Đăng xuất
                            </Button>
                        </div>
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default SettingsPage;
