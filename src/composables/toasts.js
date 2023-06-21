import { useToast } from 'primevue/usetoast';

export function useToasts() {
  const toast = useToast();

  const showToast = ({ closable, message, life, severity, summary }) => {
    toast.add({
      closable: closable ?? false,
      detail: message ?? '',
      life: life ?? 4000,
      severity: severity ?? 'success',
      summary: summary ?? '',
    });
  };

  return {
    showToast,
  };
}
