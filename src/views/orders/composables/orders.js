import { useConnectionsStore } from '@/stores/connections'
import { useOrdersStore } from '@/stores/orders'

export function useOrders() {
  const connections = useConnectionsStore()
  const orders = useOrdersStore()

  const fetchOrdersHandler = async () => {
    await orders.fetchOrders(connections.storeId)
  }

  const getOrderStatus = (status) => {
    return status === 'pushed' ? 'success' : 'danger'
  }

  return {
    fetchOrdersHandler,
    getOrderStatus,
    orders,
  }
}
