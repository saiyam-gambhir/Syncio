import { usePayoutsStore } from '@/stores/payouts'
import { useConnectionsStore } from '@/stores/connections'
import { useToasts } from '@/composables/toasts'

export function usePayouts() {
  const { storeId } = useConnectionsStore()
  const payouts = usePayoutsStore()
  const { showToast } = useToasts()

  const fetchDashboardStats = async () => {
    await payouts.fetchDashboardStats(storeId)
  }

  const fetchPayableOrders = async () => {
    await payouts.fetchPayableOrders(storeId)
  }

  return {
    fetchDashboardStats,
    fetchPayableOrders,
    payouts,
  }
}
