export const fetchProducts = {
  async fetchProducts() {
    if(!this.selectedStore) {
      this.loading = false;
      return;
    }

    this.loading = true;

    const {
      connection_id,
      id,
    } = this.selectedStore;

    const {
      filters,
      limiter,
      page,
      productType,
      search_str,
      sortBy,
      vendor,
    } = this.queries;

    const {
      storeId,
      storeType,
    } = useConnectionsStore();

    const params = {
      'meta_fields[product_type]': productType,
      'meta_fields[vendor]': vendor,
      connection_id: connection_id,
      destination_store_id: storeId,
      filters,
      limiter,
      origin: storeType,
      page,
      page: page,
      search_str,
      sort_by_desc: sortBy?.sortByDesc,
      sort_by: sortBy?.key,
      source_store_id: id,
    };

    const { products, success } = await axiosService.getData('products', params);
    if(success) {
      this.products = await products;
      this.loading = false;
    }
  }
};
