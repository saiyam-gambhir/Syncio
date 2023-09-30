import { useConnectionsStore } from 'connections';
import deepmerge from 'deepmerge';

/* ----- Actions ----- */
import { bulkCommissionsUpdate } from './actions/bulkCommissionsUpdate';
import { deleteStoreCommission } from './actions/deleteStoreCommission';
import { updateStoreCommission } from './actions/updateStoreCommission';

export const usePayoutsSettingsStore = defineStore('payoutsSettings', {
  state: () => {
    return {
      activeTabIndex: 0,
      areStoreCommissionsChanged: false,
      commissionTypeOptions: [
        { name: 'Flat rate', type: 'flat_rate' },
        { name: 'Percentage', type: 'percentage' },
      ],
      storeConnections: null,
      storeDefaultCommissionRate: {},
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
    deleteStoreCommission,
    updateStoreCommission,
  ]),

  persist: {
    enabled: true,
    strategies: [
      {
        key: 'payoutsSettings',
        storage: sessionStorage,
        paths: [
          'activeTabIndex'
        ],
      },
    ],
  },
});
