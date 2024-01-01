export const fetchPaidPayouts = {
  async fetchPaidPayouts(page) {
    try {
      this.paidPayouts.loading = true;
      const { filterUnwantedQueries } = useFilters();
      filterUnwantedQueries(this.queries, '');

      const params = {
        limiter: this.limiter,
        page: page ?? 1,
      };
      const { current_page, last_page, next_page_url, payouts, previous_page_url, total } = await axiosService.getData(`stores/payout/all-payout-data/${this.storeId}?${new URLSearchParams(this.queries).toString()}`, params);

      this.paidPayouts = {
        items: payouts,
        pagination: {
          current_page,
          last_page,
          next_page_url,
          per_page: this.limiter,
          previous_page_url,
          total_count: total,
        }
      };

    } catch (error) {
    } finally {
      this.paidPayouts.loading = false;
    }
  }
};
