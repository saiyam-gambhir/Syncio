import { useConnectionsStore } from 'connections';
import deepmerge from 'deepmerge';

/* ----- Actions ----- */
import { fetchPaidPayouts } from './actions/fetchPaidPayouts';
import { fetchPayableOrders } from './actions/fetchPayableOrders';
import { fetchSourcePayouts } from './actions/fetchSourcePayouts';
import { fetchUnpaidPayouts } from './actions/fetchUnpaidPayouts';
import { setDateRangeFilter } from './actions/setDateRangeFilter';
import { setStatusFilter } from './actions/setStatusFilter';
import { updatePayout } from './actions/updatePayout';

export const usePayoutsStore = defineStore('payouts', {
  state: () => {
    return {
      activeTabIndex: 0,
      limiter: 10,
      completePayouts: { items: [], loading: false, pagination: {} },
      openPayouts: { items: [], loading: false, pagination: {} },
      paidPayouts: { items: [], loading: false, pagination: {} },
      payableOrders: { items: [], loading: false, pagination: {} },
      payablePayouts: { items: [], loading: false, pagination: {} },
      unpaidPayouts: { items: [], loading: false, pagination: {} },
      queries: {
        'filters[date_range]': '2023-06-11 to 2023-09-09',
        'filters[status]': null,
        'filters[target_store]': null,
      },
    };
  },

  getters: {
    storeId() {
      const { storeId } = useConnectionsStore();
      return storeId;
    }
  },

  actions: deepmerge.all([
    fetchPaidPayouts,
    fetchPayableOrders,
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
          'queries',
        ],
      },
    ],
  },
});
