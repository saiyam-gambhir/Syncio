export const fetchPayoutPreview = {
  async fetchPayoutPreview(orderIds) {
    try {
      this.loadingCreatePayout = true;
      const params = {
        current_store_id: this.storeId,
        order_ids: orderIds,
        target_store_id: this.selectedPayoutOrdersStore,
      }

      const { data } = await axiosService.postData('stores/payout/get-preview-payout', params);
      this.payoutCreationDetails = data.flat();

    } catch (error) {
    } finally {
      this.loadingCreatePayout = false;
    }
  }
};
