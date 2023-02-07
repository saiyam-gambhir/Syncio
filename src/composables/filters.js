import { useAuthStore } from '@/stores/auth'

export function useFilters() {
  const auth = useAuthStore()

  const copyToClipBoard = (val = '') => {
    return navigator.clipboard.writeText(val)
  }

  const formatCurrency = (val = 0, currency = auth.currency, locales = auth.locales) => {
    if(!val) return
    return Intl.NumberFormat(locales, {
      currency,
      style: 'currency'
    }).format(val)
  }

  const randomInteger = (min = 25, max = 100) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  return {
    copyToClipBoard,
    formatCurrency,
    randomInteger,
  }
}
