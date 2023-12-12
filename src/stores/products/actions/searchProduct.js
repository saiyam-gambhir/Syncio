export const searchProduct = {
  async searchProduct(externalProductId) {
    const { storeId } = useConnectionsStore();

    const params = {
      destination_store_id: null,
      product_id: externalProductId,
      store_id: storeId,
    };

    const response = await axiosService.getData('products/search-by-id', params);
    if(response.success) {
      this.productDetails.destinationProduct = response.sourceProduct;
    }
  }
};
