import { useConnectionsStore } from '@/stores/connections';
import axiosService from '@/composables/axios';

export const getProductDetails = {
  async getProductDetails({ externalProductId, targetStoreId }) {
    const { storeId } = useConnectionsStore();

    const params = {
      destination_store_id: storeId,
      product_id: externalProductId,
      store_id: targetStoreId,
    };

    const response = await axiosService.getData('products/search-by-id', params);
    if(response.success) {
      this.productDetails = response;
    }
  }
};
