import { useConnectionsStore } from '@/stores/connections';
import { useOrdersStore } from '@/stores/orders';

export function useOrders() {
  const connections = useConnectionsStore();
  const orders = useOrdersStore();
  const statusOptions = {
    failed: 'danger',
    invalid: 'danger',
    not_pushed: 'warning',
    pushed: 'success',
  };

  const fetchOrder = async orderId => {
    await orders.fetchOrder(connections.storeId, orderId);
  };

  const fetchOrders = async () => {
    await orders.fetchOrders(connections.storeId);
  };

  const fetchPushSettings = async () => {
    await orders.fetchPushSettings(connections.storeId);
  };

  const getOrderStatus = status => {
    return statusOptions[status];
  };

  const toggleAutoPush = async () => {
    await orders.toggleAutoPush(connections.storeId);
  };

  const setAutoPushStatus = () => {
    orders.autoPushStatus ? (orders.isAutoPushEnabled = 'On') : (orders.isAutoPushEnabled = 'Off');
  };

  return {
    fetchOrder,
    fetchOrders,
    fetchPushSettings,
    getOrderStatus,
    orders,
    setAutoPushStatus,
    toggleAutoPush,
  };
}
