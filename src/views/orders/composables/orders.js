export function useOrders() {
  const connections = useConnectionsStore();
  const orders = useOrdersStore();
  const statusOptions = {
    failed: 'danger',
    invalid: 'danger',
    not_pushed: 'warning',
    partially_pushed: 'warning',
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
  const pushStatus = {
    blocked: 'danger',
    failed: 'danger',
    invalid: 'danger',
    not_pushed: 'warning',
    partially_pushed: 'warning',
    pushed: 'success',
  };

  const fetchOrder = async orderId => {
    await orders.fetchOrder(orderId);
  };

  const fetchOrders = async () => {
    await orders.fetchOrders();
  };

  const fetchPushSettings = async () => {
    await orders.fetchPushSettings(connections.storeId);
  };

  const setAutoPushStatus = () => {
    orders.autoPushStatus ? (orders.isAutoPushEnabled = 'On') : (orders.isAutoPushEnabled = 'Off');
  };

  const toggleAutoPush = async () => {
    await orders.toggleAutoPush(connections.storeId);
    orders.isEnableAutoPushRequested = false;
  };

  const getOrderStatus = status => {
    return statusOptions[status];
  };

  const getFinancialStatus = status => {
    return financialStatusOptions[status];
  };

  const getFulfillmentStatus = status => {
    return fulfillmentStatus[status];
  };

  const getPushStatus = status => {
    return pushStatus[status];
  };

  return {
    fetchOrder,
    fetchOrders,
    fetchPushSettings,
    getFinancialStatus,
    getFulfillmentStatus,
    getOrderStatus,
    getPushStatus,
    orders,
    setAutoPushStatus,
    toggleAutoPush,
  };
}
