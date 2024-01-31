export const bulkCommissionsUpdate = {
  async bulkCommissionsUpdate(payload, updateType, isBulkUpdate = false) {
    this.loadingBulkCommissions = true;

    let updatedStores = [];
    let updatedProducts = [];
    let commissionRates = null;

    if(updateType === 'store') {
      if(!isBulkUpdate) {
        updatedStores = payload.filter(store => {
          const { platform, store_commission_rate: { type, value } } = store;
          return platform === 'shopify' && (type && value);
        });
      } else {
        updatedStores = payload;
      }

      commissionRates = updatedStores.map(store => {
        const { external_product_id, connection_id, id, store_commission_rate: { type, value } } = store;
        return {
          commission_type: isBulkUpdate ? this.bulkCommission.type : type,
          commission_value: isBulkUpdate ? this.bulkCommission.val : value,
          connection_id,
          destination_store_id: this.storeId,
          source_product_id: external_product_id,
          source_store_id: id,
        }
      });
    } else if (updateType === 'product') {
      if(!isBulkUpdate) {
        updatedProducts = payload.filter(product => {
          const { product_commission_rate: { type, value } } = product;
          return type && value;
        });
      } else {
        updatedProducts = payload;
      }

      const connections = useConnectionsStore();

      const getConnectionId = (id) => {
        const store = connections.connectionFilterItems?.find(store => store.id === id);
        return store?.connection_id;
      }

      commissionRates = updatedProducts.map(product => {
        const { external_product_id, product_commission_rate: { type, value }, store_id } = product;
        return {
          commission_type: isBulkUpdate ? this.bulkCommission.type : type,
          commission_value: isBulkUpdate ? this.bulkCommission.val : value,
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

    const { success } = await axiosService.postData(`stores/${this.storeId}/bulk-commission-rates-update`, params);
    if(success) {
      if(updateType === 'store') {
        const connections = useConnectionsStore();
        await connections.fetchConnections();
      } else if (updateType === 'product') {
        await this.fetchByProduct();
      }
    }
    this.loadingBulkCommissions = false;
    this.isBulkCommissionUpdateRequested = false;
  }
};
