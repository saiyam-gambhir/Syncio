import { useFilters } from '@/composables/filters';

export const fetchPayableOrders = {
  async fetchPayableOrders() {
    try {
      this.payableOrders.loading = true;
      const { filterUnwantedQueries } = useFilters();
      filterUnwantedQueries(this.queries, '');

      const { data: { payableOrders } } = await this.$https(`stores/payout/all-store-data/${this.storeId}?${new URLSearchParams(this.queries).toString()}`);
      if(!payableOrders || Object.keys(payableOrders).length === 0) {
        this.payableOrders.items = [];
      } else {
        this.payableOrders.items = Object.keys(payableOrders).map(key => {
          return { ...payableOrders[key], id: +key };
        }) ?? [];
      }
    } catch (error) {
      throw new Error(error);
    } finally {
      this.payableOrders.loading = false;
    }
  },
};
