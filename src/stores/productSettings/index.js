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
      isMetaFieldsRequested: false,
      loading: false,
      settingsUpdated: false,
      sourceProductSettings: [],
      sourceVariantSettings: [],
      stringifyDestinationProductSettings: null,
      stringifyDestinationVariantSettings: null,
      stringifySourceProductSettings: null,
      stringifySourceVariantSettings: null,
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
        ],
      },
    ],
  },
});
