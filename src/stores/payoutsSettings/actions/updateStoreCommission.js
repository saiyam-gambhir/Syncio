export const updateStoreCommission = {
  async updateStoreCommission() {
    const { type, value } = this.storeDefaultCommissionRate;
    const { storeId, fetchCurrentStore } = useConnectionsStore();

    const params = {
      commission_type: type,
      commission_value: String(value),
      connection_id: null,
      current_store_id: storeId,
      target_store_id: null,
    };

    const response = await axiosService.postData(`stores/${storeId}/add-store-commission`, params);
    if(response.success) {
      this.products = response.products;
      fetchCurrentStore();
    }
  }
};
