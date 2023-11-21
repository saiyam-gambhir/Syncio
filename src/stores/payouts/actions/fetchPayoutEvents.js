export const fetchPayoutEvents = {
  async fetchPayoutEvents(payoutId) {
    const params = {
      current_store_id: this.storeId,
      payout_id: payoutId
    };
    const { events, next_page_url, success, total } = await axiosService.postData(`stores/payout/payout-events`, params);
    if(success) {
      this.payoutEvents.data = events;
      this.payoutEvents.pagination = {
        next_page_url,
        total,
      }
    }
  }
};
