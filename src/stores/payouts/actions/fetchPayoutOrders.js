export const fetchPayoutOrders = {
  async fetchPayoutOrders({ page, targetStoreId }) {
    try {
      this.payoutOrders.loading = true;
      this.arePayableOrdersVisible = false;

      const { filterUnwantedQueries } = useFilters();
      filterUnwantedQueries(this.queries, '');

      const URL = `stores/payout/payout-orders/${this.storeId}/${targetStoreId}?${new URLSearchParams(this.queries).toString()}`;
      const params = {
        'filters[order_number]': this.payoutOrdersSearchString,
        limiter: this.limiter,
        page: page ?? 1,
      };
      const { current_page, last_page, next_page_url, payoutOrders, previous_page_url, total } = await axiosService.getData(URL, params);

      if(!payoutOrders || Object.keys(payoutOrders).length === 0) {
        this.payoutOrders.items = [];
      } else {
        this.payoutOrders.items = Object.keys(payoutOrders).map(key => {
          return { ...payoutOrders[key], id: +key };
        }) ?? [];
      }

      this.payoutOrders.pagination = {
        current_page,
        last_page,
        next_page_url,
        per_page: this.limiter,
        previous_page_url,
        total_count: total,
      };

    } catch (error) {
    } finally {
      this.payoutOrders.loading = false;
    }
  }
};
