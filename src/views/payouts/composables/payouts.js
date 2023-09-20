import { usePayoutsStore } from 'payouts';

export function usePayouts() {
  const payouts = usePayoutsStore();

  const {
    fetchPaidPayouts,
    fetchPayableOrders,
    fetchPayablePayouts,
    fetchSourcePayouts,
    fetchUnpaidPayouts,
    updatePayout,
  } = usePayoutsStore();

  const fetchPayableOrdersHandler = async () => {
    await fetchPayableOrders();
  };

  const fetchPayablePayoutsHandler = async targetStoreId => {
    await fetchPayablePayouts({ targetStoreId });
  };

  const fetchUnpaidPayoutsHandler = async (page) => {
    payouts.$patch({ queries: { ...payouts.queries, 'filters[status]': 'unpaid' } })
    await fetchUnpaidPayouts(page);
  };

  const fetchPaidPayoutsHandler = async (page) => {
    payouts.$patch({ queries: { ...payouts.queries, 'filters[status]': 'paid_received' } })
    await fetchPaidPayouts(page);
  };

  const fetchSourcePayoutsHandler = async (status) => {
    payouts.$patch({ queries: { ...payouts.queries, 'filters[status]': status } })
    await fetchSourcePayouts();
  };

  const handleTabChange = async index => {
    payouts.$patch({ activeTabIndex: index });
  };

  const updatePayoutHandler = async (payoutId, status) => {
    const payload = { payoutId, status };
    const success = await updatePayout(payload);
    if(success) {
      switch (status) {
        case 'paid':
          await payouts.$patch({ activeTabIndex: 2 });
          break;

        case 'unpaid':
        case 'payment_received':
          await payouts.$patch({ activeTabIndex: 1 });
          break;
      }
    }
  };

  return {
    fetchPaidPayoutsHandler,
    fetchPayableOrdersHandler,
    fetchPayablePayoutsHandler,
    fetchSourcePayoutsHandler,
    fetchUnpaidPayoutsHandler,
    handleTabChange,
    payouts,
    updatePayoutHandler,
  };
}
