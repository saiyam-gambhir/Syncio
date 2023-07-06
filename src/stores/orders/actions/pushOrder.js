export const pushOrder = {
  async pushOrder({ orderId, shippingCost, storeId, targetStoreId }) {
    const response = await this.$https.post(`stores/${storeId}/orders/${orderId}/push`, {
      shipping_cost: shippingCost,
      target_store_id: targetStoreId,
    });
  }
};
