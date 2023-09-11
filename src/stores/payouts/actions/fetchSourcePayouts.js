import { useFilters } from '@/composables/filters';

export const fetchSourcePayouts = {
  async fetchSourcePayouts(page) {
    try {
      const { filterUnwantedQueries } = useFilters();

      filterUnwantedQueries(this.queries, '');

      const { data: { payouts: [ items, pagination ] } } = await this.$https(`stores/payout/source-payouts/${this.storeId}?${new URLSearchParams(this.queries).toString()}`, {
        params: {
          limiter: this.limiter,
          page: page ?? 1,
        },
      });

      switch (this.queries['filters[status]']) {
        case 'not_confirmed':
          this.openPayouts.items = await items;
          this.openPayouts.pagination = await pagination;
          break;

        case 'payment_confirmed':
          this.completePayouts.items = await items;
          this.completePayouts.pagination = await pagination;
          break;
      }

    } catch (error) {
      throw new Error(error);
    } finally {
      this.openPayouts.loading = false;
    }
  }
};
