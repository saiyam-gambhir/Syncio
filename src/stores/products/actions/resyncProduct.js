export const resyncProduct = {
  async resyncProduct(sourceProductMapperIds) {
    const params = {
      mapper_ids: sourceProductMapperIds,
    };

    this.syncProductsQueue = [...this.syncProductsQueue, ...sourceProductMapperIds];
    const response = await axiosService.postData('products/sync', params);
    if(response) return response;
  }
};
