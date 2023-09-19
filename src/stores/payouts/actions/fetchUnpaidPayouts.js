import { useFilters } from '@/composables/filters';

export const fetchUnpaidPayouts = {
  async fetchUnpaidPayouts(page) {
    try {
      this.unpaidPayouts.loading = true;
      const { filterUnwantedQueries } = useFilters();
      filterUnwantedQueries(this.queries, '');

      const { data: { current_page, last_page, next_page_url, payouts, previous_page_url, total } } = await this.$https(`stores/payout/all-payout-data/${this.storeId}?${new URLSearchParams(this.queries).toString()}`, {
        params: {
          limiter: this.limiter,
          page: page ?? 1,
        },
      });

      this.unpaidPayouts = {
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
      throw new Error(error);
    } finally {
      this.unpaidPayouts.loading = false;
    }
  }
};
