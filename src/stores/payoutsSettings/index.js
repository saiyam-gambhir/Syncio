import deepmerge from 'deepmerge';

/* ----- Actions ----- */
import { updateStoreCommission } from './actions/updateStoreConnection';

export const usePayoutsSettingsStore = defineStore('payoutsSettings', {
  state: () => {
    return {
      activeTabIndex: 0,
      commissionTypeOptions: [
        { name: 'Flat rate', type: 'flat_rate' },
        { name: 'Percentage', type: 'percentage' },
      ],
      storeDefaultCommissionRate: {},
    };
  },

  actions: deepmerge.all([
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
