export const unsyncProduct = {
  async unsyncProduct(sourceProductMapperIds, keepProducts = true) {
    const params = {
      keeping_products: keepProducts,
      mapper_ids: sourceProductMapperIds,
    };

    this.syncProductsQueue = [...this.syncProductsQueue, ...sourceProductMapperIds];
    const response = await axiosService.postData('products/unsync', params);
    if(response) return response;
  }
};
