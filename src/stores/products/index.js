import deepmerge from 'deepmerge';

/* ----- Actions ----- */
import { bulkSyncProducts } from './actions/bulkSyncProducts';
import { fetchInventory } from './actions/fetchInventory';
import { fetchMetaFields } from './actions/fetchMetaFields';
import { fetchProductDetails } from './actions/fetchProductDetails';
import { fetchProducts } from './actions/fetchProducts';
import { mapProduct } from './actions/mapProduct';
import { resyncProduct } from './actions/resyncProduct';
import { searchProduct } from './actions/searchProduct';
import { searchStoreProducts } from './actions/searchStoreProducts';
import { startBulkMapper } from './actions/startBulkMapper';
import { syncProduct } from './actions/syncProduct';
import { unsyncProduct } from './actions/unsyncProduct';

export const useProductsStore = defineStore('products', {
  state: () => {
    return {
      bulkSync: {
        count: null,
        isOngoing: false,
        showDialog: false,
      },
      clickedProduct: null,
      isBulkMapperDialogRequested: false,
      isBulkUnsyncAction: false,
      isDuplicateSkuFound: false,
      isProductDetailsDialogRequested: false,
      isUnsyncAndDeleteRequested: false,
      isUnsyncRequested: false,
      isViewDetailsRequested: true,
      loading: true,
      loadingBulkMapper: false,
      loadingMapProduct: false,
      loadingProductDetails: false,
      pagination: null,
      pagination: null,
      productDetails: null,
      products: null,
      productTypeOptions: null,
      searchedProducts: [],
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

      /* ----- Filters for large stores */
      searchAttribute: undefined,
      searchOptions: [
        { label: 'Barcode', value: 'barcode' },
        { label: 'Product ID', value: 'product_id' },
        { label: 'SKU', value: 'sku' },
        { label: 'Tags', value: 'tags' },
        { label: 'Title', value: 'title' },
      ],
      storesWithNewFilters: [
        '260-sample-sale.myshopify.com',
        'blue-bungalow-nz.myshopify.com',
        'dressbarnonline-dev.myshopify.com',
        'lirumlarumleg.myshopify.com',
        'lirumlarumlegno.myshopify.com',
        'pccha-eu.myshopify.com',
        'solado-eu.myshopify.com',
      ],
      totalProductCount: null,
    };
  },

  actions: deepmerge.all([
    bulkSyncProducts,
    fetchInventory,
    fetchMetaFields,
    fetchProductDetails,
    fetchProducts,
    mapProduct,
    resyncProduct,
    searchProduct,
    searchStoreProducts,
    startBulkMapper,
    syncProduct,
    unsyncProduct,
  ]),

  getters: {
    selectedStore({ selectedStoreId }) {
      const { connections } = useConnectionsStore();
      return connections?.find(connection => connection.id === selectedStoreId);
    },

    enableNewFilters() {
      const { storeName } = useConnectionsStore();
      return this.storesWithNewFilters.includes(storeName) || +this.totalProductCount > 30000;
    },
  },

  persist: {
    enabled: true,
    strategies: [
      {
        key: 'products',
        storage: sessionStorage,
        paths: [
          'excludeZeroStock',
          'queries',
          'searchAttribute',
          'selectedStoreId',
          'statusOption',
          'syncProductsQueue',
          'visibilityOption',
        ],
      },
    ],
  },
});
