import { toast } from 'vue3-toastify';

const toastOptions = {
  autoClose: 4000,
  closeButton: false,
  dangerouslyHTMLString: true,
  pauseOnFocusLoss: false,
  pauseOnHover: true,
  style: {
    fontSize: '1.1rem',
    fontWeight: '600',
    right: 0,
    top: 0,
  },
  theme: 'dark',
  toastStyle: {
    backgroundColor: '#0e3b4d',
    lineHeight: '1.65rem',
    marginBottom: '.5rem',
  },
  transition: 'slide',
};

export function useToasts() {

  const showToast = ({ message, severity }) => {
    toast(message, { ...toastOptions, type: severity ?? 'success', });
  };

  return {
    showToast,
  };
};
