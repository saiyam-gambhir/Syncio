import { useConnectionsStore } from '@/stores/connections';
import { useAxios } from '@/composables/axios';

export const fetchProducts = {
  async fetchProducts(isStoreChanged = false) {
    if(this.products && !isStoreChanged) return;

    const { connection_id, id } = this.selectedStore[0];
    const { filters, limiter, sort_by_desc, sort_by } = this.queries;
    const { getData } = useAxios();
    const { storeId, storeType } = useConnectionsStore();

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

    const response = await getData('products', params);
    if(response.success) {
      this.products = response.products;
    }
  }
};
