import deepmerge from 'deepmerge';

/* ----- Actions ----- */
import { addComment } from './actions/addComment';
import { confirmPayout } from './actions/confirmPayout';
import { createPayout } from './actions/createPayout';
import { deletePayout } from './actions/deletePayout';
import { fetchPaidPayouts } from './actions/fetchPaidPayouts';
import { fetchPayableOrders } from './actions/fetchPayableOrders';
import { fetchPayout } from './actions/fetchPayout';
import { fetchPayoutEvents } from './actions/fetchPayoutEvents';
import { fetchPayoutOrders } from './actions/fetchPayoutOrders';
import { fetchPayoutPreview } from './actions/fetchPayoutPreview';
import { fetchSourcePayouts } from './actions/fetchSourcePayouts';
import { fetchUnpaidPayouts } from './actions/fetchUnpaidPayouts';
import { updatePayout } from './actions/updatePayout';

export const usePayoutsStore = defineStore('payouts', {
  state: () => {
    return {
      activeTabIndex: 0,
      arePayableOrdersVisible: true,
      completePayouts: { items: [], loading: false, pagination: {} },
      datePickerLabel: 'Last 30 days',
      isCreatePayoutDetailsRequested: false,
      isViewPayoutDetailsRequested: false,
      limiter: 10,
      loadingComment: false,
      loadingCreatePayout: false,
      loadingDeletePayout: false,
      loadingPayout: false,
      loadingPayoutEvents: false,
      openPayouts: { items: [], loading: false, pagination: {} },
      openPayoutsStatusOptions: [
        { value: 'paid', label: 'Paid' },
        { value: 'payout_created', label: 'Unpaid' },
      ],
      paidPayouts: { items: [], loading: false, pagination: {} },
      paidPayoutsStatusOptions: [
        { key: 'Paid', value: 'paid' },
        { key: 'Received', value: 'payment_confirmed' },
      ],
      payableOrders: { items: [], loading: false, pagination: {} },
      payablePayouts: { items: [], loading: false, pagination: {} },
      payout: null,
      payoutCreationDetails: null,
      payoutEvents: { data: [], pagination: null },
      payoutOrders: { items: [], loading: false, pagination: {} },
      payoutOrdersSearchString: null,
      selectedPayoutOrders: [],
      selectedPayoutOrdersStore: null,
      queries: {
        'filters[date_range]': null,
        'filters[status]': null,
        'filters[target_store]': null,
      },
      destinationPayoutsDateRange: null,
      sourceQueries: {
        'filters[date_range]': null,
        'filters[origin_store]': null,
        'filters[status]': null,
      },
      sourcePayoutsDateRange: null,
      unpaidPayouts: { items: [], loading: false, pagination: {} },
    };
  },

  getters: {
    storeId() {
      const { storeId } = useConnectionsStore();
      return storeId;
    },

    selectedPayoutOrdersStoreDetails() {
      const { connectionFilterItems } = useConnectionsStore();
      const store = connectionFilterItems?.find(store => store.id === this.selectedPayoutOrdersStore);
      return store;
    }
  },

  actions: deepmerge.all([
    addComment,
    confirmPayout,
    createPayout,
    deletePayout,
    fetchPaidPayouts,
    fetchPayableOrders,
    fetchPayout,
    fetchPayoutEvents,
    fetchPayoutOrders,
    fetchPayoutPreview,
    fetchSourcePayouts,
    fetchUnpaidPayouts,
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
          'datePickerLabel',
          'destinationPayoutsDateRange',
          'queries',
          'sourceQueries',
        ],
      },
    ],
  },
});
