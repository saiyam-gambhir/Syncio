export const bulkSyncProducts = {
  async bulkSyncProducts(sourceProductIds) {
    const params = {
      connection_id: this.selectedStore.connection_id,
      source_product_ids: sourceProductIds,
    };

    this.syncProductsQueue = [...this.syncProductsQueue, ...sourceProductIds];
    const response = await axiosService.postData('products/import', params);

    if(response.success) {
      this.bulkSync.showDialog = true;
      return response;
    };
  }
};
