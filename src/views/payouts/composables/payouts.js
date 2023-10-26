import { usePayoutsStore } from 'payouts';

export function usePayouts() {
  const payouts = usePayoutsStore();

  const fetchPayoutPreviewHandler = async () => {
    const selectedPayoutOrders = payouts.selectedPayoutOrders.map(order => order.order_id);
    payouts.$patch({ isCreatePayoutDetailsRequested: true });
    await payouts.fetchPayoutPreview(selectedPayoutOrders);
  };

  const fetchPayableOrdersHandler = async () => {
    payouts.$patch({ queries: { ...payouts.queries, 'filters[status]': 'unpaid' } })
    await payouts.fetchPayableOrders();
  };

  const fetchPayablePayoutsHandler = async targetStoreId => {
    await payouts.fetchPayablePayouts({ targetStoreId });
  };

  const fetchPayoutOrdersHandler = async targetStoreId => {
    await payouts.fetchPayoutOrders({ targetStoreId: targetStoreId });
    payouts.selectedPayoutOrdersStore = targetStoreId;
  };

  const fetchUnpaidPayoutsHandler = async (page) => {
    payouts.$patch({ queries: { ...payouts.queries, 'filters[status]': 'unpaid' } })
    await payouts.fetchUnpaidPayouts(page);
  };

  const fetchPaidPayoutsHandler = async (page) => {
    payouts.$patch({ queries: { ...payouts.queries, 'filters[status]': 'paid_received' } })
    await payouts.fetchPaidPayouts(page);
  };

  const fetchSourcePayoutsHandler = async (status) => {
    payouts.$patch({ queries: { ...payouts.queries, 'filters[status]': status } })
    await payouts.fetchSourcePayouts();
  };

  const fetchPayoutHandler = async (payoutId, targetStoreId) => {
    payouts.$patch({ isViewPayoutDetailsRequested: true });
    await payouts.fetchPayout(payoutId, targetStoreId);
    await payouts.fetchPayoutEvents(payoutId);
  };

  const handleTabChange = async index => {
    payouts.$patch({ activeTabIndex: index });
  };

  const updatePayoutHandler = async (payoutId, status) => {
    const payload = { payoutId, status };
    const success = await payouts.updatePayout(payload);
    if(success) {
      switch (status) {
        case 'paid':
          await payouts.$patch({ activeTabIndex: 2 });
          payouts.isViewPayoutDetailsRequested = false;
          break;

        case 'unpaid':
        case 'payment_received':
          await payouts.$patch({ activeTabIndex: 1 });
          payouts.isViewPayoutDetailsRequested = false;
          break;
      }
    }
  };

  return {
    fetchPaidPayoutsHandler,
    fetchPayableOrdersHandler,
    fetchPayablePayoutsHandler,
    fetchPayoutHandler,
    fetchPayoutOrdersHandler,
    fetchPayoutPreviewHandler,
    fetchSourcePayoutsHandler,
    fetchUnpaidPayoutsHandler,
    handleTabChange,
    payouts,
    updatePayoutHandler,
  };
}
