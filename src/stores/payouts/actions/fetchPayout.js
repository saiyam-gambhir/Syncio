export const fetchPayout = {
  async fetchPayout(payoutId, targetStoreId) {
    try {
      this.loadingPayout = true;
      const params = {
        current_store_id: this.storeId,
        payout_id: payoutId,
        target_store_id: targetStoreId,
      }

      const { data: { data, payout, success } } = await this.$https.post(`stores/payout/view-payout`, { ...params });

      if(success) {
        this.payout = {
          ...payout,
          data: data.flat(),
        };
      }

    } catch (error) {
      throw new Error(error);
    } finally {
      this.loadingPayout = false;
    }
  }
};
