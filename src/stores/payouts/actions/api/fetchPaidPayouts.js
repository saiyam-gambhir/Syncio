import { useConnectionsStore } from 'connections';
import { useFilters } from '@/composables/filters';

export const fetchPaidPayouts = {
  async fetchPaidPayouts(page) {
    try {
      const { filterUnwantedQueries } = useFilters();
      const { storeId } = useConnectionsStore();

      filterUnwantedQueries(this.queries, '');

      const { data: { payouts, success } } = await this.$https(`stores/payout/all-payout-data/${storeId}?${new URLSearchParams(this.queries).toString()}`, {
        params: {
          limiter: this.limiter,
          page: page ?? 1,
        },
      });

      if (success && payouts?.length > 0) this.paidPayouts.items = payouts;
    } catch (error) {
      throw new Error(error);
    } finally {
      this.paidPayouts.loading = false;
    }
  }
};
