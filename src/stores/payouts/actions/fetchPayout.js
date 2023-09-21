export const fetchPayout = {
  async fetchPayout(payoutId, targetStoreId) {
    try {
      this.loadingPayout = true;
      const params = {
        current_store_id: this.storeId,
        payout_id: payoutId,
        target_store_id: targetStoreId,
      }

      const { data: { payout, success } } = await this.$https.post(`stores/payout/view-payout`, { ...params });

      if(success) {
        this.payout = payout;
      }

    } catch (error) {
      throw new Error(error);
    } finally {
      this.loadingPayout = false;
    }
  }
};
