import { usePayoutsStore } from '@/stores/payouts';
import { useConnectionsStore } from '@/stores/connections';

export function usePayouts() {
  const { storeId } = useConnectionsStore();
  const payouts = usePayoutsStore();
  const {
    fetchPaidPayouts,
    fetchPayableOrders,
    fetchPayablePayouts,
    fetchUnpaidPayouts,
    SET_DATE_RANGE_FILTER,
    SET_STATUS_FILTER,
    updatePayout,
  } = usePayoutsStore();

  const fetchPayableOrdersHandler = async () => {
    await fetchPayableOrders(storeId);
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
    await fetchPaidPayouts(storeId);
  };

  const updatePayoutHandler = async ({ payout_id, status, activeTabIndex }) => {
    const payload = { current_store_id: storeId, payout_id, status };
    await updatePayout(payload);
    payouts.$patch({ activeTabIndex });
  };

  return {
    fetchPaidPayoutsHandler,
    fetchPayableOrdersHandler,
    fetchPayablePayoutsHandler,
    fetchUnpaidPayoutsHandler,
    payouts,
    updatePayoutHandler,
  };
}
