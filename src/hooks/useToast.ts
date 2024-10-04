import { toast, ToastOptions } from 'react-toastify';

type ToastType = 'success' | 'warn' | 'error';

type UseToastProps = {
  message: string;
  type: ToastType;
  options?: ToastOptions;
};

export const useToast = () => {
  const showToast = ({ message, type, options }: UseToastProps) => {
    switch (type) {
      case 'success':
        toast.success(message, options);
        break;
      case 'warn':
        toast.warn(message, options);
        break;
      case 'error':
        toast.error(message, options);
        break;
      default:
        toast(message, options);
        break;
    }
  };

  return showToast;
};
