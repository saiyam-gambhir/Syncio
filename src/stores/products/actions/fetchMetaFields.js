export const fetchMetaFields = {
  async fetchMetaFields() {
    const response = await axiosService.getData(`stores/${this.selectedStoreId}/get-product-meta-fields`);
    if(response.success) {
      this.productTypeOptions = response.meta_fields?.product_type.filter(field => field.value !== null);
      this.vendorOptions = response.meta_fields?.vendor.filter(field => field.value !== null);
    }
  }
};
