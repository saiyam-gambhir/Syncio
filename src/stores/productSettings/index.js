import { defineStore } from 'pinia';
import deepmerge from 'deepmerge';

/* ----- ACTIONS ----- */
import { fetchSettings } from './actions/fetchSettings';

export const useProductSettingsStore = defineStore('productSettings', {
  state: () => {
    return {
      activeTabIndex: 0,
      destinationProductSettings: [],
      destinationVariantSettings: [],
      loading: false,
      sourceProductSettings: [],
      stringifyDestinationProductSettings: null,
      stringifyDestinationVariantSettings: null,
      stringifySourceProductSettings: null,
    };
  },

  actions: deepmerge.all([fetchSettings]),

  persist: {
    enabled: true,
    strategies: [
      {
        key: 'productSettings',
        storage: sessionStorage,
        paths: [
          'activeTabIndex',
          'destinationProductSettings',
          'destinationVariantSettings',
          'sourceProductSettings',
          'stringifyDestinationProductSettings',
          'stringifyDestinationVariantSettings',
          'stringifySourceProductSettings',
        ],
      },
    ],
  },
});
