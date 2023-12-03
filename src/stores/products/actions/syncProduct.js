export const syncProduct = {
  async syncProduct(sourceProductId) {
    try {
      const params = {
        connection_id: this.selectedStore.connection_id,
        source_product_id: sourceProductId,
      };

      this.syncProductsQueue.push(sourceProductId);
      const response = await axiosService.postData('products/import-now', params);
      if(response) return response;
    } catch (error) {
      debugger
      console.log(error);
    }
  }
};
