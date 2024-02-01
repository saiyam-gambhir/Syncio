export const fetchProducts = {
  async fetchProducts() {
    if(!this.selectedStore) {
      this.loading = false;
      return;
    }

    this.loading = true;

    const { connection_id, id } = this.selectedStore;
    const { storeId, storeType } = useConnectionsStore();
    const {
      filters,
      limiter,
      page,
      productType,
      search_str,
      sortBy,
      vendor,
    } = this.queries;

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
      search_attribute: this.searchAttribute === 'none' ? this.searchAttribute : this.searchAttribute?.value,
      search_str,
      sort_by_desc: sortBy?.sortByDesc,
      sort_by: sortBy?.key,
      source_store_id: storeType === 'destination' ? id : storeId,
    };

    // Check if products exist
    if (!this.products) {
      // If no products, set search attribute to 'none'
      params.search_attribute = 'none';
    } else if (this.enableNewFilters && this.searchAttribute !== 'none') {
      // If new filters are enabled and search attribute is not 'none', use the selected search attribute's value
      params.search_attribute = this.searchAttribute?.value;
    } else if (!this.enableNewFilters && (this.searchAttribute !== 'none' || search_str !== null)) {
      // If new filters are not enabled and search attribute is not 'none' OR
      // If new filters are not enabled, search attribute is 'none', and search string is not null,
      // set search attribute to undefined
      params.search_attribute = undefined;
    } else {
      // Default case: If none of the above conditions match, set search attribute to 'none'
      params.search_attribute = 'none';
    }

    const response = await axiosService.getData('products', params);
    if(response?.success) {
      const { current_page, next_page_url, previous_page_url, products, total, total_product_count, } = response;

      this.products = await products;
      this.totalProductCount = total_product_count;

      this.pagination = {
        current_page: current_page,
        next_page_url: next_page_url,
        per_page: limiter,
        previous_page_url: previous_page_url,
        total_count: total,
      };

      this.bulkSync = {
        ...this.bulkSync,
        count: +response['bulk-sync-count'],
        isOngoing: response.bulk_sync,
      };

      this.loading = false;
    }
  }
};
