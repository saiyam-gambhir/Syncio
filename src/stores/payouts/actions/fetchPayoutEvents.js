export const fetchPayoutEvents = {
  async fetchPayoutEvents(payoutId, page = 1) {
    try {
      this.loadingPayoutEvents = true;
      if(String(page) === '1') this.payoutEvents.data = [];

      const params = {
        current_store_id: this.storeId,
        payout_id: payoutId,
        page,
      };

      const { events, next_page_url, success, total } = await axiosService.postData(`stores/payout/payout-events`, params);

      if(success) {
        this.payoutEvents.data = [...this.payoutEvents.data, ...events];
        const nextPage = next_page_url ? new URL(next_page_url).searchParams.get('page') : null;

        this.payoutEvents.pagination = {
          nextPage,
          total,
        }
      }
    } catch (error) {
    } finally {
      this.loadingPayoutEvents = false;
    }
  }
};
