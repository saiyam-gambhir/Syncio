import { useConnectionsStore } from '@/stores/connections';
import { useFilters } from '@/composables/filters';

export const fetchProducts = {
  async fetchProducts() {
    const { storeId, storeType } = useConnectionsStore();
    const { filters, limiter, sort_by_desc, sort_by } = this.queries;
    const { connection_id, id } = this.selectedStore[0];

    const params = {
      connection_id: connection_id,
      destination_store_id: storeId,
      filters,
      limiter,
      origin: storeType,
      sort_by_desc,
      sort_by,
      source_store_id: id,
    };

    // Get the filterUnwantedQueries function from the filters composable
    const { filterUnwantedQueries } = useFilters();

    // Remove unwanted queries using the filterUnwantedQueries function
    filterUnwantedQueries(params, '');

    const response = this.$https('products', {
      params: { ...params }
    })
  }
};
