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
      bulkCommission: {
        type: null,
        val: null,
      },
      commissionTypeOptions: [
        { name: 'Flat rate', type: 'flat_rate' },
        { name: 'Percentage', type: 'percentage' },
      ],
      isBulkCommissionUpdateRequested: false,
      limiter: 25,
      loadingBulkCommissions: false,
      loadingStoreProducts: true,
      storeConnections: null,
      storeDefaultCommissionRate: {},
      storeProducts: null,
      unMutatedStoreProducts: null,
      selectedProducts: [],
      selectedStores: [],
      storeProductsPagination: {},
      searchString: null,
      productQueries: {
        connection_id: null,
        source_store_id: null,
      }
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
