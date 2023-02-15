import { useAuthStore } from '@/stores/auth'
import { DateTime } from 'luxon'

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

  const formatDate = (val, timeZone = auth.timeZone) => {
    if(!val) return 'Invalid Date'
    return DateTime.fromISO(val).setZone(timeZone).toFormat('EEE, dd-MM-yyyy, hh:mm a')
  }

  const randomInteger = (min = 25, max = 100) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  return {
    copyToClipBoard,
    formatCurrency,
    formatDate,
    randomInteger,
  }
}
