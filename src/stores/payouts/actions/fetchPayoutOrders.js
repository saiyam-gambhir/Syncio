import { useFilters } from '@/composables/filters';

export const fetchPayoutOrders = {
  async fetchPayoutOrders({ page, targetStoreId }) {
    try {
      this.payoutOrders.loading = true;

      const { filterUnwantedQueries } = useFilters();
      filterUnwantedQueries(this.queries, '');

      const getURL = `stores/payout/payout-orders/${this.storeId}/${targetStoreId}?${new URLSearchParams(this.queries).toString()}`;
      const { data: { current_page, last_page, next_page_url, payoutOrders, previous_page_url, total } } = await this.$https(getURL, {
        params: {
          limiter: this.limiter,
          page: page ?? 1,
        },
      });

      this.payoutOrders = {
        items: payoutOrders,
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
      throw new Error(error);
    } finally {
      this.payoutOrders.loading = false;
    }
  }
};
