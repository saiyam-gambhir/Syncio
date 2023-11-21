export const updatePayout = {
  async updatePayout({ payoutId, status }) {

    const params = {
      current_store_id: this.storeId,
      payout_id: payoutId,
      status: status,
    };

    const { success } = await axiosService.postData('stores/payout/update-payout-status', params);
    return success;
  }
};
