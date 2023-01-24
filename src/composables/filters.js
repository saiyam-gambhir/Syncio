import { useAuthStore } from '@/stores/auth'

export function useFilters() {
  const auth = useAuthStore()

  const formatCurrency = (val = 0, currency = auth.currency, locales = auth.locales) => {
    if(!val) return
    return Intl.NumberFormat(locales, {
      currency,
      style: 'currency'
    }).format(val)
  }

  return {
    formatCurrency
  }
}
