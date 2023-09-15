import { useFilters } from '@/composables/filters';

export const fetchUnpaidPayouts = {
  async fetchUnpaidPayouts(page) {
    try {
      this.unpaidPayouts.loading = true;
      const { filterUnwantedQueries } = useFilters();
      filterUnwantedQueries(this.queries, '');

      const { data: { payouts } } = await this.$https(`stores/payout/all-payout-data/${this.storeId}?${new URLSearchParams(this.queries).toString()}`, {
        params: {
          limiter: this.limiter,
          page: page ?? 1,
        },
      });

      this.unpaidPayouts.items = payouts;

    } catch (error) {
      throw new Error(error);
    } finally {
      this.unpaidPayouts.loading = false;
    }
  }
};
