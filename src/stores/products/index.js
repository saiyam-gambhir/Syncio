import { defineStore } from 'pinia';
import deepmerge from 'deepmerge';

/* ----- Actions ----- */

export const useProductsStore = defineStore('products', {
  state: () => {
    return {
      selectedStore: null,
    };
  },

  actions: deepmerge.all([]),

  persist: {
    enabled: true,
    strategies: [
      {
        key: 'products',
        storage: sessionStorage,
        paths: [
          'selectedStore',
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
