export const confirmPayout = {
  async confirmPayout(payoutId) {

    const params = {
      current_store_id: this.storeId,
      payout_id: payoutId,
    };

    const { success } = await axiosService.postData('stores/payout/confirm-payment', params);
    if(success) {
      this.activeTabIndex = 1;
    }
  }
};
