import { toast } from 'react-hot-toast';

export const useCustomToast = () => {
  const showToast = (message, type = 'success') => {
    const toastOptions = {
      duration: 3000,
            position: 'top-right',
      style: {
        background: type === 'success' ? '#10B981' : '#EF4444',
        color: 'white',
        padding: '16px',
        borderRadius: '10px',
      },
      className: 'toast-notification',
    };

    if (type === 'success') {
      toast.success(message, toastOptions);
    } else if (type === 'error') {
      toast.error(message, toastOptions);
    }
  };

  return { showToast };
};
