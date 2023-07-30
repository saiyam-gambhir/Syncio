import { defineStore } from 'pinia';
import deepmerge from 'deepmerge';
import { useConnectionsStore } from '@/stores/connections';

/* ----- Actions ----- */
import { fetchProducts } from './actions/fetchProducts';

export const useProductsStore = defineStore('products', {
  state: () => {
    return {
      selectedStoreId: null,
      queries: {
        'filters': [],
        'limiter': 25,
        'meta_fields[vendor]': null,
        'sort_by_desc': null,
        'sort_by': null,
      }
    };
  },

  actions: deepmerge.all([
    fetchProducts,
  ]),

  getters: {
    selectedStore({ selectedStoreId }) {
      const { connections } = useConnectionsStore();
      return connections.filter(connection => connection.id === selectedStoreId);
    },
  },

  persist: {
    enabled: true,
    strategies: [
      {
        key: 'products',
        storage: sessionStorage,
        paths: [
          'selectedStoreId',
        ],
      },
    ],
  },
});
