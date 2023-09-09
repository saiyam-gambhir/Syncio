import { usePayoutsStore } from 'payouts';

export function usePayouts() {
  const payouts = usePayoutsStore();

  const {
    fetchPaidPayouts,
    fetchPayableOrders,
    fetchPayablePayouts,
    fetchUnpaidPayouts,
    SET_STATUS_FILTER,
    updatePayout,
  } = usePayoutsStore();

  const fetchPayableOrdersHandler = async () => {
    await fetchPayableOrders();
  };

  const fetchPayablePayoutsHandler = async targetStoreId => {
    await fetchPayablePayouts({ targetStoreId });
  };

  const fetchUnpaidPayoutsHandler = async () => {
    SET_STATUS_FILTER('unpaid');
    await fetchUnpaidPayouts();
  };

  const fetchPaidPayoutsHandler = async () => {
    SET_STATUS_FILTER('paid_received');
    await fetchPaidPayouts();
  };

  const handleTabChange = async index => {
    payouts.$patch({ activeTabIndex: index })
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
          await payouts.$patch({ activeTabIndex: 1 });
          break;
      }
    }
  };

  return {
    fetchPaidPayoutsHandler,
    fetchPayableOrdersHandler,
    fetchPayablePayoutsHandler,
    fetchUnpaidPayoutsHandler,
    handleTabChange,
    payouts,
    updatePayoutHandler,
  };
}
