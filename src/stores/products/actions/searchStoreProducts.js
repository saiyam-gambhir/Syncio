export const searchStoreProducts = {
  async searchStoreProducts(searchString) {
    const { storeId } = useConnectionsStore();

    const params = {
      search_str: searchString,
      store_id: storeId,
    };

    const response = await axiosService.getData('products/search-store-products', params);
    if(response.success) {
      this.searchedProducts = !!response.products[0] ? await response.products : [];
    }
  }
};
