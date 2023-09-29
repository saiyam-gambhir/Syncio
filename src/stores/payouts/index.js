import { useConnectionsStore } from 'connections';
import deepmerge from 'deepmerge';

/* ----- Actions ----- */
import { fetchPaidPayouts } from './actions/fetchPaidPayouts';
import { fetchPayableOrders } from './actions/fetchPayableOrders';
import { fetchPayout } from './actions/fetchPayout';
import { fetchPayoutOrders } from './actions/fetchPayoutOrders';
import { fetchPayoutPreview } from './actions/fetchPayoutPreview';
import { fetchSourcePayouts } from './actions/fetchSourcePayouts';
import { fetchUnpaidPayouts } from './actions/fetchUnpaidPayouts';
import { setDateRangeFilter } from './actions/setDateRangeFilter';
import { setStatusFilter } from './actions/setStatusFilter';
import { updatePayout } from './actions/updatePayout';

export const usePayoutsStore = defineStore('payouts', {
  state: () => {
    return {
      activeTabIndex: 0,
      arePayableOrdersVisible: true,
      completePayouts: { items: [], loading: false, pagination: {} },
      isCreatePayoutDetailsRequested: false,
      isViewPayoutDetailsRequested: false,
      limiter: 10,
      loadingPayout: false,
      openPayouts: { items: [], loading: false, pagination: {} },
      paidPayouts: { items: [], loading: false, pagination: {} },
      paidPayoutsStatusOptions: [
        { value: 'paid', label: 'Paid' },
        { value: 'payment_confirmed', label: 'Received' },
      ],
      payableOrders: { items: [], loading: false, pagination: {} },
      payablePayouts: { items: [], loading: false, pagination: {} },
      payout: null,
      payoutCreationDetails: null,
      payoutOrders: { items: [], loading: false, pagination: {} },
      selectedPayoutOrders: [],
      selectedPayoutOrdersStore: null,
      queries: {
        'filters[date_range]': '2021-06-28 to 2023-09-26',
        'filters[status]': null,
        'filters[target_store]': null,
      },
      unpaidPayouts: { items: [], loading: false, pagination: {} },
    };
  },

  getters: {
    storeId() {
      const { storeId } = useConnectionsStore();
      return storeId;
    },

    selectedPayoutOrdersStoreName() {
      const { connectionFilterItems } = useConnectionsStore();
      const store = connectionFilterItems?.find(store => store.id === this.selectedPayoutOrdersStore);
      return store?.store_domain;
    }
  },

  actions: deepmerge.all([
    fetchPaidPayouts,
    fetchPayableOrders,
    fetchPayout,
    fetchPayoutOrders,
    fetchPayoutPreview,
    fetchSourcePayouts,
    fetchUnpaidPayouts,
    setDateRangeFilter,
    setStatusFilter,
    updatePayout,
  ]),

  persist: {
    enabled: true,
    strategies: [
      {
        key: 'payouts',
        storage: sessionStorage,
        paths: [
          'activeTabIndex',
          //'arePayableOrdersVisible',
          'queries',
        ],
      },
    ],
  },
});
