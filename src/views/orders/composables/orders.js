import { useConnectionsStore } from '@/stores/connections'
import { useOrdersStore } from '@/stores/orders'

export function useOrders() {
  const connections = useConnectionsStore()
  const orders = useOrdersStore()

  const fetchOrder = async orderId => {
    await orders.fetchOrder(connections.storeId, orderId)
  }

  const fetchOrders = async () => {
    await orders.fetchOrders(connections.storeId)
  }

  const getOrderStatus = status => {
    return status === 'pushed' ? 'success' : 'danger'
  }

  return {
    fetchOrder,
    fetchOrders,
    getOrderStatus,
    orders,
  }
}
