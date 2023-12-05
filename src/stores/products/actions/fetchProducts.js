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
      sort_by_desc,
      sort_by,
    } = this.queries;

    const {
      storeId,
      storeType,
    } = useConnectionsStore();

    const params = {
      connection_id: connection_id,
      destination_store_id: storeId,
      filters,
      limiter,
      origin: storeType,
      sort_by_desc,
      sort_by,
      source_store_id: id,
    };

    const { products, success } = await axiosService.getData('products', params);
    if(success) {
      this.products = await products;
      this.loading = false;
    }
  }
};
