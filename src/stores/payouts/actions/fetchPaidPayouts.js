import { useFilters } from '@/composables/filters';

export const fetchPaidPayouts = {
  async fetchPaidPayouts(page) {
    try {
      this.paidPayouts.loading = true;
      const { filterUnwantedQueries } = useFilters();
      filterUnwantedQueries(this.queries, '');

      const { data: { payouts } } = await this.$https(`stores/payout/all-payout-data/${this.storeId}?${new URLSearchParams(this.queries).toString()}`, {
        params: {
          limiter: this.limiter,
          page: page ?? 1,
        },
      });

      this.paidPayouts.items = payouts;

    } catch (error) {
      throw new Error(error);
    } finally {
      this.paidPayouts.loading = false;
    }
  }
};
