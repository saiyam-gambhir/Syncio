import { useToast } from 'primevue/usetoast'

export function useToasts() {
  const toast = useToast()

  const showToast = ({ closable, detail, life, severity, summary }) => {
    toast.add({
      closable: closable ?? false,
      detail: detail ?? '',
      life: life ?? 4000,
      severity: severity ?? 'success',
      summary: summary ?? '',
    })
  }

  return {
    showToast
  }
}
