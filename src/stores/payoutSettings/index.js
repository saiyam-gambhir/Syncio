import deepmerge from 'deepmerge';

/* ----- Actions ----- */
import { updateStoreCommission } from './actions/updateStoreConnection';

export const usePayoutSettingsStore = defineStore('payoutSettings', {
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
        key: 'payoutSettings',
        storage: sessionStorage,
        paths: [
          'activeTabIndex'
        ],
      },
    ],
  },
});
