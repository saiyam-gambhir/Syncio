export function useProducts() {
  const {
    bulkSync,
    excludeZeroStock,
    fetchProducts,
    pagination,
    products,
    queries,
    resyncProduct,
    selectedProducts,
    selectedStoreId,
    statusOption,
    syncedProducts,
    syncProductsQueue,
    totalProductCount,
    unsyncedProducts,
    visibilityOption,
  } = toRefs(useProductsStore());

  const {
    fetchCurrentPlan,
  } = toRefs(usePlanStore());

  const {
    userId,
  } = toRefs(useAuthStore());

  const unselectAllRowsHandler = () => {
    selectedProducts.value = [];
    syncedProducts.value = [];
    unsyncedProducts.value = [];
    products?.value?.forEach(product => product.added = false);
  };

  const applyFilters = () => {
    queries.value.filters = [];
    queries.value.page = 1;

    if(visibilityOption.value && visibilityOption.value !== 'all') {
      queries.value.filters.push(visibilityOption.value);
    }

    if(statusOption.value && statusOption.value !== 'all') {
      queries.value.filters.push(statusOption.value);
    }

    if(excludeZeroStock.value) {
      queries.value.filters.push('exclude_zero_stock');
    }
  };

  const updateCurrentPageHandler = async (page, perPage) => {
    queries.value.page = page;
    queries.value.limiter = perPage;
    await fetchProducts.value();
    unselectAllRowsHandler();
  };

  const checkProductStatusOnRefresh = () => {
    products.value?.forEach(product => {
      if(product.mapper_id && !product.is_sync_failed) {
        const productIndex = syncProductsQueue.value.findIndex(item => +item === +product.external_product_id);
        syncProductsQueue.value.splice(productIndex, 1);
      }
      getProductSyncStatus(product);
    });
  };

  const fetchProductsHandler = async () => {
    applyFilters();
    await fetchProducts.value();
    checkProductStatusOnRefresh();
    unselectAllRowsHandler();
  };

  const resyncProductHandler = async (product) => {
    const mapperIds = [];
    mapperIds.push(product.mapper_id);
    const response = await resyncProduct.value(mapperIds);
    if(response?.success) {
      updateProductStatus(product, product.mapper_id);
    }
    await fetchCurrentPlan.value(userId.value);
  };

  const getProductSyncStatus = product => {
    if(product) {
      const { is_sync_failed, external_product_id, mapper_id, product_status } = product;

      if((syncProductsQueue.value.includes(external_product_id) || syncProductsQueue.value.includes(mapper_id)) && !is_sync_failed || (syncProductsQueue.value.includes(external_product_id) && is_sync_failed)) {
        return 'pending';
      }

      if (product_status === 'replaced' && mapper_id) {
        return 'replaced';
      }

      if (mapper_id) {
        return 'synced';
      }

      if (is_sync_failed && !mapper_id) {
        return 'attention';
      }

      if(!mapper_id && !is_sync_failed && product_status !== 'unsupported') {
        return 'not synced';
      }

      if(product_status === 'unsupported') {
        return 'unsupported';
      }

      return 'not synced';
    }
  };

  const updateProductStatus = (product, id) => {
    const syncedProductIndex = syncProductsQueue.value.indexOf(id);
    syncProductsQueue.value.splice(syncedProductIndex, 1);
    getProductSyncStatus(product);
  };

  const resetProducts = () => {
    selectedStoreId.value = null;
    pagination.value = null;
    products.value = null;
    totalProductCount.value = null;
    bulkSync.value = {
      count: null,
      isOngoing: false,
      showDialog: false,
    };
  };

  return {
    fetchProductsHandler,
    getProductSyncStatus,
    resyncProductHandler,
    resetProducts,
    unselectAllRowsHandler,
    updateCurrentPageHandler,
    updateProductStatus,
  };
};
