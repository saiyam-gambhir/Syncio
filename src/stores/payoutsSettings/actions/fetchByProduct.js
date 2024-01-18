export const fetchByProduct = {
  async fetchByProduct(page) {

    try {
      this.loadingStoreProducts = true;

      const { filterUnwantedQueries } = useFilters();
      filterUnwantedQueries(this.productQueries, '');

      const params = {
        ...this.productQueries,
        destination_store_id: this.storeId,
        limiter: this.limiter,
        page: page ?? 1,
        search_str: this.searchString,
      };

      const { current_page, last_page, next_page_url, previous_page_url, products, total } = await axiosService.getData('products', params);

      this.storeProductsPagination = {
        current_page,
        last_page,
        next_page_url,
        per_page: this.limiter,
        previous_page_url,
        total_count: total,
      };

      this.storeProducts = await products;
      this.unMutatedStoreProducts = JSON.stringify(this.storeProducts);
    } catch (error) {
      throw new Error(error);
    } finally {
      this.loadingStoreProducts = false;
    }
  }
};
