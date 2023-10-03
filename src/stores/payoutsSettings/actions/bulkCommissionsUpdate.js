import { useConnectionsStore } from 'connections';

export const bulkCommissionsUpdate = {
  async bulkCommissionsUpdate(payload, updateType) {

    let updatedStores = [];
    let updatedProducts = [];
    let commissionRates = null;

    if(updateType === 'store') {
      updatedStores = payload.filter(store => {
        const { platform, store_commission_rate: { type, value } } = store;
        return platform === 'shopify' && (type && value);
      });

      commissionRates = updatedStores.map(store => {
        const { connection_id, id, store_commission_rate: { type, value } } = store;
        return {
          commission_type: type,
          commission_value: value,
          connection_id,
          destination_store_id: this.storeId,
          source_product_id: null,
          source_store_id: id,
        }
      });
    } else if (updateType === 'product') {
      updatedProducts = payload.filter(product => {
        const { product_commission_rate: { type, value } } = product;
        return type && value;
      });

      const connections = useConnectionsStore();

      const getConnectionId = (id) => {
        const store = connections.connectionFilterItems?.find(store => store.id === id);
        return store?.connection_id;
      }

      commissionRates = updatedProducts.map(product => {
        const { external_product_id, product_commission_rate: { type, value }, store_id } = product;
        return {
          commission_type: type,
          commission_value: value,
          connection_id: getConnectionId(store_id),
          destination_store_id: this.storeId,
          source_product_id: external_product_id,
          source_store_id: store_id,
        }
      });
    }

    const params = {
      commission_rates: commissionRates,
      destination_store_id: this.storeId,
    };

    const { data: { success } } = await this.$https.post(`stores/${this.storeId}/bulk-commission-rates-update`, { ...params });
    if(success) {
      if(updateType === 'store') {
        const connections = useConnectionsStore();
        await connections.fetchConnections();
      } else if (updateType === 'product') {
        await this.fetchByProduct();
      }
    }
  }
};
