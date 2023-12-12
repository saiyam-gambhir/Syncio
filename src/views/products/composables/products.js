export function useProducts() {
  const {
    excludeZeroStock,
    fetchProducts,
    queries,
    selectedProducts,
    statusOption,
    syncedProducts,
    unsyncedProducts,
    visibilityOption,
    resyncProduct,
    syncProductsQueue,
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
  };

  const applyFilters = () => {
    queries.value.filters = [];

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

  const updateCurrentPageHandler = async page => {
    queries.value.page = page;
    await fetchProducts.value();
  };

  const fetchProductsHandler = async () => {
    applyFilters();
    await fetchProducts.value();
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
    const { product_status, mapper_id, is_sync_failed, external_product_id } = product;

    if((syncProductsQueue.value.includes(external_product_id) || syncProductsQueue.value.includes(mapper_id))) {
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

    if(!mapper_id && !is_sync_failed) {
      return 'not synced';
    }

    return 'not synced';
  };

  const updateProductStatus = (product, id) => {
    const syncedProductIndex = syncProductsQueue.value.indexOf(id);
    syncProductsQueue.value.splice(syncedProductIndex, 1);
    getProductSyncStatus(product);
  };

  return {
    fetchProductsHandler,
    getProductSyncStatus,
    resyncProductHandler,
    unselectAllRowsHandler,
    updateCurrentPageHandler,
    updateProductStatus,
  };
};
