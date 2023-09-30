import { useConnectionsStore } from 'connections';

export const bulkCommissionsUpdate = {
  async bulkCommissionsUpdate(payload) {
    const updatesStores = payload.filter(store => {
      const { platform, store_commission_rate: { type, value } } = store;
      return platform === 'shopify' && (type && value);
    });

    const commissionRates = updatesStores.map(store => {
      const { connection_id, id, store_commission_rate: { type, value } } = store
      return {
        commission_type: type,
        commission_value: value,
        connection_id,
        destination_store_id: this.storeId,
        source_product_id: null,
        source_store_id: id,
      }
    });

    const params = {
      commission_rates: [...commissionRates],
      destination_store_id: this.storeId,
    }

    const { data: { success } } = await this.$https.post(`stores/${this.storeId}/bulk-commission-rates-update`, { ...params });
    if(success) {
      const connections = useConnectionsStore();
      await connections.fetchConnections();
    }
  }
};
