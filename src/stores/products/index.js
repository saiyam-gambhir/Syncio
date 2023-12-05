import deepmerge from 'deepmerge';

/* ----- Actions ----- */
import { bulkSyncProducts } from './actions/bulkSyncProducts';
import { fetchMetaFields } from './actions/fetchMetaFields';
import { fetchProductDetails } from './actions/fetchProductDetails';
import { fetchProducts } from './actions/fetchProducts';
import { resyncProduct } from './actions/resyncProduct';
import { startBulkMapper } from './actions/startBulkMapper';
import { syncProduct } from './actions/syncProduct';
import { unsyncProduct } from './actions/unsyncProduct';

export const useProductsStore = defineStore('products', {
  state: () => {
    return {
      isBulkMapperDialogRequested: false,
      isDuplicateSkuFound: false,
      isProductDetailsDialogRequested: false,
      isViewDetailsRequested: true,
      loading: true,
      loadingBulkMapper: false,
      loadingProductDetails: false,
      pagination: null,
      productDetails: null,
      products: null,
      selectedProducts: null,
      selectedStoreId: null,
      syncedProducts: [],
      syncProductsQueue: [],
      unsyncedProducts: [],
      queries: {
        'filters': [],
        'limiter': 25,
        'meta_fields[product_type]': null,
        'meta_fields[vendor]': null,
        'page': 1,
        'search_str': null,
        'sort_by_desc': null,
        'sort_by': null,
      },
    };
  },

  actions: deepmerge.all([
    bulkSyncProducts,
    fetchMetaFields,
    fetchProductDetails,
    fetchProducts,
    resyncProduct,
    startBulkMapper,
    syncProduct,
    unsyncProduct,
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
          'syncProductsQueue',
        ],
      },
    ],
  },
});
