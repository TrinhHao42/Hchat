import {AlertCircle, CheckCircle, X} from 'lucide-react';
import { ToastProps } from '@/types/Props/ToastProps';

const Toast: React.FC<ToastProps & { onClose: () => void }> = ({ message, type = 'error', onClose }) => {
  const icons = {
    error: <AlertCircle className="h-5 w-5" />,
    success: <CheckCircle className="h-5 w-5" />,
    warning: <AlertCircle className="h-5 w-5" />,
  };

  const colors = {
    error: 'bg-red-50 border-red-200 text-red-800',
    success: 'bg-green-50 border-green-200 text-green-800',
    warning: 'bg-yellow-50 border-yellow-200 text-yellow-800',
  };

  const iconColors = {
    error: 'text-red-500',
    success: 'text-green-500',
    warning: 'text-yellow-500',
  };

  return (
    <div className={`fixed top-4 right-4 z-50 max-w-md p-4 rounded-xl border shadow-lg backdrop-blur-sm animate-in slide-in-from-top-2 ${colors[type]}`}>
      <div className="flex items-center space-x-3">
        <div className={iconColors[type]}>{icons[type]}</div>
        <p className="font-medium flex-1">{message}</p>
        <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors">
          <X className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
};

export default Toast;