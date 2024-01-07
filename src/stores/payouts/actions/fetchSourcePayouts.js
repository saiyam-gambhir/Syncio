export const fetchSourcePayouts = {
  async fetchSourcePayouts(page = 1) {
    try {
      this.activeTabIndex === 1 ? this.completePayouts.loading = true : this.openPayouts.loading = true;
      const { filterUnwantedQueries } = useFilters();

      filterUnwantedQueries(this.sourceQueries, '');

      const params = {
        limiter: this.limiter,
        page: page ?? 1,
      };
      const { payouts: [ items, pagination ] } = await axiosService.getData(`stores/payout/source-payouts/${this.storeId}?${new URLSearchParams(this.sourceQueries).toString()}`, params);

      switch (this.sourceQueries['filters[status]']) {
        case 'not_confirmed':
        case 'paid':
        case 'payout_created':
          this.openPayouts.items = await items;
          this.openPayouts.pagination = await pagination;
          this.openPayouts.pagination = {
            ...this.openPayouts.pagination,
            total_count: pagination.total,
            per_page: this.limiter
          };
          break;

        case 'payment_confirmed':
          this.completePayouts.items = await items;
          this.completePayouts.pagination = await pagination;
          this.completePayouts.pagination = {
            ...this.completePayouts.pagination,
            total_count: pagination.total,
            per_page: this.limiter
          };
          break;
      }

    } catch (error) {
    } finally {
      this.openPayouts.loading = this.completePayouts.loading = false;
    }
  }
};
