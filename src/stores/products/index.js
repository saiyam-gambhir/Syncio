import deepmerge from 'deepmerge';

/* ----- Actions ----- */
import { fetchProductDetails } from './actions/fetchProductDetails';
import { fetchProducts } from './actions/fetchProducts';
import { syncProduct } from './actions/syncProduct';
import { startBulkMapper } from './actions/startBulkMapper';

export const useProductsStore = defineStore('products', {
  state: () => {
    return {
      isBulkMapperDialogRequested: false,
      isProductDetailsDialogRequested: false,
      isViewDetailsRequested: true,
      loading: false,
      loadingBulkMapper: false,
      loadingProductDetails: false,
      pagination: null,
      productDetails: null,
      products: null,
      selectedProducts: null,
      selectedStoreId: null,
      syncProductsQueue: [],
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
    fetchProductDetails,
    fetchProducts,
    syncProduct,
    startBulkMapper,
  ]),

  getters: {
    selectedStore({ selectedStoreId }) {
      const { connections } = useConnectionsStore();
      return connections.find(connection => connection.id === selectedStoreId);
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
