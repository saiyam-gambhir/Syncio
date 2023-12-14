export const mapProduct = {
  async mapProduct() {
    const { storeId } = useConnectionsStore();

    const params = {
      destination_product_id: String(this.productDetails.destinationProduct.ref_id),
      destination_store_id: storeId,
      source_product_id: String(this.productDetails.sourceProduct.ref_id),
      source_store_id: this.selectedStore.id,
    };

    this.loadingMapProduct = true;
    const response = await axiosService.postData('products/products-mapping', params);
    this.loadingMapProduct = false;
  }
};
