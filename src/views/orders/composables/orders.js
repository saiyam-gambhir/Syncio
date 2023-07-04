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
  const financialStatusOptions = {
    authorised: 'success',
    paid: 'success',
    partially_paid: 'warning',
    partially_refunded: 'danger',
    pending: 'warning',
    refunded: 'success',
    unpaid: 'danger',
    voided: 'danger',
  };
  const fulfillmentStatus = {
    partial: 'warning',
    fulfilled: 'success',
    unfulfilled: 'danger',
    restocked: 'info',
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

  const toggleAutoPush = async () => {
    await orders.toggleAutoPush(connections.storeId);
  };

  const setAutoPushStatus = () => {
    orders.autoPushStatus ? (orders.isAutoPushEnabled = 'On') : (orders.isAutoPushEnabled = 'Off');
  };

  const getOrderStatus = status => {
    return statusOptions[status];
  };

  const getFinancialStatus = status => {
    return financialStatusOptions[status];
  }

  const getFulfillmentStatus = status => {
    return fulfillmentStatus[status];
  }

  return {
    fetchOrder,
    fetchOrders,
    fetchPushSettings,
    getOrderStatus,
    orders,
    setAutoPushStatus,
    toggleAutoPush,
    getFinancialStatus,
    getFulfillmentStatus,
  };
}
