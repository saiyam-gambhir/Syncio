export function usePayouts() {
  const payouts = usePayoutsStore();
  const plan = usePlanStore();

  const fetchPayoutPreviewHandler = async (order = null) => {
    if(plan.isPayoutsLimitReached) {
      plan.shouldShowPayoutsLimitDialog = true;
      return;
    }

    let selectedPayoutOrders = [];

    if(order) {
      payouts.selectedPayoutOrders.push(order);
    }

    selectedPayoutOrders = payouts.selectedPayoutOrders.map(order => order.order_id);

    payouts.$patch({ isCreatePayoutDetailsRequested: true });
    await payouts.fetchPayoutPreview(selectedPayoutOrders);
  };

  const createPayoutHandler = async (lineItems, payoutDetails, markAsPaid) => {
    const { payoutsTotal, salesTotal, taxTotal } = payoutDetails;
    const payload = {
      payoutLineItems: lineItems,
      payoutsTotal,
      salesTotal,
      taxTotal
    }

    await payouts.createPayout(payload, markAsPaid);
  };

  const fetchPayableOrdersHandler = async () => {
    payouts.$patch({ queries: { ...payouts.queries, 'filters[status]': 'unpaid' } })
    await payouts.fetchPayableOrders();
  };

  const fetchPayablePayoutsHandler = async targetStoreId => {
    await payouts.fetchPayablePayouts({ targetStoreId });
  };

  const fetchPayoutOrdersHandler = async (page, targetStoreId) => {
    await payouts.fetchPayoutOrders({ page: page, targetStoreId: targetStoreId });
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

  const fetchSourcePayoutsHandler = async (status, page = 1) => {
    payouts.$patch({ sourceQueries: { ...payouts.sourceQueries, 'filters[status]': status } })
    await payouts.fetchSourcePayouts(page);
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

  const scrollToOrdersSection = () => {
    const invoicedOrders = document.querySelector('[data-section="invoiced-orders"]')
    invoicedOrders.scrollIntoView({ behavior: 'smooth' })
  };

  return {
    createPayoutHandler,
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
    scrollToOrdersSection,
    updatePayoutHandler,
  };
}
