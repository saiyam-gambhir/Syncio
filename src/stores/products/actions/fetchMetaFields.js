export const fetchMetaFields = {
  async fetchMetaFields() {
    const response = await axiosService.getData(`stores/${this.selectedStoreId}/get-product-meta-fields`);
    if(response.success) {
      console.log(response);
    }
  }
};
