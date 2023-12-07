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
      destination_store_id: storeType === 'destination' ? storeId : id,
      filters,
      limiter,
      origin: storeType,
      page,
      page: page,
      search_str,
      sort_by_desc: sortBy?.sortByDesc,
      sort_by: sortBy?.key,
      source_store_id: storeType === 'destination' ? id : storeId,
    };

    const response = await axiosService.getData('products', params);
    if(response?.success) {
      const { current_page, next_page_url, previous_page_url, products, total } = response;

      this.products = await products;
      this.pagination = {
        current_page: current_page,
        next_page_url: next_page_url,
        per_page: limiter,
        previous_page_url: previous_page_url,
        total_count: total,
      };
      this.loading = false;
    }
  }
};
