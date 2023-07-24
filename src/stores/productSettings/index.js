import { defineStore } from 'pinia';
import deepmerge from 'deepmerge';

/* ----- Actions ----- */
import { fetchSettings } from './actions/fetchSettings';
import { updateSettings } from './actions/updateSettings';

export const useProductSettingsStore = defineStore('productSettings', {
  state: () => {
    return {
      activeTabIndex: 0,
      destinationProductSettings: [],
      destinationVariantSettings: [],
      loading: false,
      settingsUpdated: false,
      sourceProductSettings: [],
      stringifyDestinationProductSettings: null,
      stringifyDestinationVariantSettings: null,
      stringifySourceProductSettings: null,
    };
  },

  actions: deepmerge.all([
    fetchSettings,
    updateSettings,
  ]),

  persist: {
    enabled: true,
    strategies: [
      {
        key: 'productSettings',
        storage: sessionStorage,
        paths: [
          'activeTabIndex',
          // 'destinationProductSettings',
          // 'destinationVariantSettings',
          // 'sourceProductSettings',
          // 'stringifyDestinationProductSettings',
          // 'stringifyDestinationVariantSettings',
          // 'stringifySourceProductSettings',
        ],
      },
    ],
  },
});
