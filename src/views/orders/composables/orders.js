import { useConnectionsStore } from '@/stores/connections'
import { useOrdersStore } from '@/stores/orders'
import { useToasts } from '@/composables/toasts'

export function useOrders() {
  const { showToast } = useToasts()
  const connections = useConnectionsStore()
  const orders = useOrdersStore()
  const statusOptions = {
    invalid: 'danger',
    not_pushed: 'warning',
    pushed: 'success',
  }

  const fetchOrder = async orderId => {
    await orders.fetchOrder(connections.storeId, orderId)
  }

  const fetchOrders = async () => {
    await orders.fetchOrders(connections.storeId)
  }

  const fetchPushSettings = async () => {
    await orders.fetchPushSettings(connections.storeId)
  }

  const getOrderStatus = status => {
    return statusOptions[status]
  }

  const toggleAutoPush = async () => {
    const message = await orders.toggleAutoPush(connections.storeId)
    showToast({ detail: message })
  }

  const setAutoPushStatus = () => {
    orders.autoPushStatus ? orders.isAutoPushEnabled = 'On' : orders.isAutoPushEnabled = 'Off'
  }

  return {
    fetchOrder,
    fetchOrders,
    fetchPushSettings,
    getOrderStatus,
    orders,
    setAutoPushStatus,
    toggleAutoPush,
  }
}
