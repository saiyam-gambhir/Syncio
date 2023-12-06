function removeDuplicates(arr, key) {
  const uniqueValues = new Map();
  arr.forEach(item => {
    const value = item[key];
    if (!uniqueValues.has(value)) {
      uniqueValues.set(value, item);
    }
  });

  const uniqueArray = Array.from(uniqueValues.values()).sort((a, b) => {
    if (a.value.toLowerCase() < b.value.toLowerCase()) return -1;
    if (a.value.toLowerCase() > b.value.toLowerCase()) return 1;
    return 0;
  });

  // uniqueArray.unshift({ key: null, value: 'All' });
  return uniqueArray;
}

export const fetchMetaFields = {
  async fetchMetaFields() {
    const response = await axiosService.getData(`stores/${this.selectedStoreId}/get-product-meta-fields`);
    if(response.success) {
      this.productTypeOptions = removeDuplicates(response.meta_fields.product_type?.filter(field => field.value !== null), 'value');
      this.vendorOptions = removeDuplicates(response.meta_fields.vendor?.filter(field => field.value !== null), 'value');
    }
  }
};
