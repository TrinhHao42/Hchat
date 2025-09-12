import { Eye, EyeOff, AlertCircle } from 'lucide-react';
import { InputFieldProps } from '@/types/Props/InputFieldProps';

const InputField: React.FC<InputFieldProps> = ({
    label, type = 'text', value, onChange, error, placeholder, icon: Icon,
    showPassword, onTogglePassword, isPassword = false
}) => {
    return (
        <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">{label}</label>
            <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Icon className="h-5 w-5 text-gray-400" />
                </div>
                <input
                    type={isPassword ? (showPassword ? 'text' : 'password') : type}
                    value={value}
                    onChange={onChange}
                    placeholder={placeholder}
                    className={`w-full pl-10 ${isPassword ? 'pr-10' : 'pr-4'} py-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors ${error ? 'border-red-300 bg-red-50' : 'border-gray-300 bg-white hover:border-gray-400'
                        }`}
                />
                {isPassword && (
                    <button
                        type="button"
                        onClick={onTogglePassword}
                        className="absolute inset-y-0 right-0 pr-3 flex items-center hover:text-indigo-600 transition-colors"
                    >
                        {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                    </button>
                )}
            </div>
            {error && (
                <div className="flex items-center space-x-2 text-red-600 text-sm animate-in slide-in-from-top-1">
                    <AlertCircle className="h-4 w-4" />
                    <span>{error}</span>
                </div>
            )}
        </div>
    );
};

export default InputField;