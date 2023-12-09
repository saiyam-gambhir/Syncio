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
      pagination: null,
      productDetails: null,
      products: null,
      productTypeOptions: null,
      selectedProducts: null,
      selectedStoreId: null,
      syncedProducts: [],
      syncProductsQueue: [],
      unsyncedProducts: [],
      vendorOptions: null,

      /* ----- Filters ----- */
      excludeZeroStock: false,
      statusOption: null,
      visibilityOption: null,
      statusOptions: [
        { key: 'All', value: 'all' },
        { key: 'Synced', value: 'synced' },
        { key: 'Not Synced', value: 'unsynced' },
      ],
      sortOptions: [
        { key: 'title', label: 'A-Z', sortByDesc: false },
        { key: 'title', label: 'Z-A', sortByDesc: true },
        { key: 'published_at', label: 'Newest to Oldest', sortByDesc: true },
        { key: 'published_at', label: 'Oldest to Newest', sortByDesc: false },
      ],
      visibilityOptions:  [
        { key: 'All', value: 'all' },
        { key: 'Online Store', value: 'published' },
        { key: 'Unavailable', value: 'unpublished' },
      ],
      queries: {
        'filters': [],
        'limiter': 25,
        'page': 1,
        'productType': null,
        'search_str': null,
        'sortBy': null,
        'vendor': null,
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
          'queries',
          'selectedStoreId',
          'statusOption',
          'syncProductsQueue',
          'visibilityOption',
        ],
      },
    ],
  },
});
