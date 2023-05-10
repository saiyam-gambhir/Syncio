import { usePayoutsStore } from '@/stores/payouts'
import { useConnectionsStore } from '@/stores/connections'
import { useToasts } from '@/composables/toasts'

export function usePayouts() {
  const { storeId } = useConnectionsStore()
  const payouts = usePayoutsStore()
  const { showToast } = useToasts()

  const fetchPayableOrders = async () => {
    await payouts.fetchPayableOrders(storeId)
  }

  return {
    fetchPayableOrders,
    payouts,
  }
}
