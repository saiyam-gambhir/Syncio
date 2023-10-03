export const fetchByProduct = {
  async fetchByProduct(page, forceUpdate = false) {

    try {
      this.loadingStoreProducts = true;

      const params = {
        destination_store_id: this.storeId,
        limiter: this.limiter,
        page: page ?? 1
      };

      const { data: { current_page, last_page, next_page_url, previous_page_url, products, total } } = await this.$https('products', {
        params: { ...params }
      });

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
