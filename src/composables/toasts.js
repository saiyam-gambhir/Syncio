import { useToast } from 'primevue/usetoast'

export function useToasts() {
  const toast = useToast()

  const showToast = (params) => {
    toast.add({
      closable: params.closable ?? false,
      detail: params.detail ?? '',
      life: params.life ?? 4000,
      severity: params.severity ?? 'success',
      summary: params.summary ?? '',
    })
  }

  return {
    showToast
  }
}
