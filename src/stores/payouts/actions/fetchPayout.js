export const fetchPayout = {
  async fetchPayout(payoutId, targetStoreId) {
    try {
      const { isDestinationStore } = useConnectionsStore();
      this.loadingPayout = true;

      const _currentStoreId = isDestinationStore ? this.storeId : targetStoreId;
      const _targetStoreId = isDestinationStore ? targetStoreId : this.storeId;

      const params = {
        current_store_id: _currentStoreId,
        payout_id: payoutId,
        target_store_id: _targetStoreId,
      }

      const { data, payout, success } = await axiosService.postData(`stores/payout/view-payout`, params);

      if(success) {
        this.payout = {
          ...payout,
          data: data.flat(),
        };
      }

    } catch (error) {
    } finally {
      this.loadingPayout = false;
    }
  }
};
