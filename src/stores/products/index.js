import deepmerge from 'deepmerge';

/* ----- Actions ----- */
import { fetchProducts } from './actions/fetchProducts';
import { getProductDetails } from './actions/getProductDetails';
import { startBulkMapper } from './actions/startBulkMapper';

export const useProductsStore = defineStore('products', {
  state: () => {
    return {
      isBulkMapperDialogRequested: false,
      loadingBulkMapper: false,
      productDetails: null,
      products: null,
      selectedStoreId: null,
      queries: {
        'filters': [],
        'limiter': 25,
        'meta_fields[vendor]': null,
        'sort_by_desc': null,
        'sort_by': null,
      },
    };
  },

  actions: deepmerge.all([
    fetchProducts,
    getProductDetails,
    startBulkMapper,
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
          'products',
          'selectedStoreId',
        ],
      },
    ],
  },
});
