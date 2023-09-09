export const updatePayout = {
  async updatePayout({ payoutId, status }) {

    const params = {
      current_store_id: this.storeId,
      payout_id: payoutId,
      status: status,
    };

    const { data: { success } } = await this.$https.post('stores/payout/update-payout-status', { ...params });

    return success;
  }
};
