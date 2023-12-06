export function useProducts() {
  const {
    fetchProducts,
    queries,
    selectedProducts,
    statusOption,
    syncedProducts,
    unsyncedProducts,
    visibilityOption,
  } = toRefs(useProductsStore());

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
  };

  const fetchProductsHandler = async () => {
    applyFilters();
    await fetchProducts.value();
    unselectAllRowsHandler();
  };

  return {
    fetchProductsHandler,
    unselectAllRowsHandler,
  };
};
