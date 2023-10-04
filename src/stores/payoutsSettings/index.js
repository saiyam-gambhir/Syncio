import { useConnectionsStore } from 'connections';
import deepmerge from 'deepmerge';

/* ----- Actions ----- */
import { bulkCommissionsUpdate } from './actions/bulkCommissionsUpdate';
import { deleteCommission } from './actions/deleteCommission';
import { fetchByProduct } from './actions/fetchByProduct';
import { updateStoreCommission } from './actions/updateStoreCommission';

export const usePayoutsSettingsStore = defineStore('payoutsSettings', {
  state: () => {
    return {
      activeTabIndex: 0,
      areProductCommissionsChanged: false,
      areStoreCommissionsChanged: false,
      commissionTypeOptions: [
        { name: 'Flat rate', type: 'flat_rate' },
        { name: 'Percentage', type: 'percentage' },
      ],
      limiter: 25,
      loadingStoreProducts: true,
      storeConnections: null,
      storeDefaultCommissionRate: {},
      storeProducts: null,
      unMutatedStoreProducts: null,
      selectedProducts: [],
      selectedStores: [],
      storeProductsPagination: {},
    };
  },

  getters: {
    storeId() {
      const { storeId } = useConnectionsStore();
      return storeId;
    },
  },

  actions: deepmerge.all([
    bulkCommissionsUpdate,
    deleteCommission,
    fetchByProduct,
    updateStoreCommission,
  ]),

  persist: {
    enabled: true,
    strategies: [
      {
        key: 'payoutsSettings',
        storage: sessionStorage,
        paths: [
          'activeTabIndex',
          'selectedStores',
          'selectedProducts',
        ],
      },
    ],
  },
});
