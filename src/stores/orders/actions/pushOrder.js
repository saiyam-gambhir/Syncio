export const pushOrder = {
  async pushOrder({ orderId, shippingCost, targetStoreId }) {
    this.loadingPushOrder = true
    const { data: { order, success } } = await this.$https.post(`stores/${this.storeId}/orders/${orderId}/push`, {
      shipping_cost: shippingCost,
      target_store_id: targetStoreId,
    });

    if(success) this.order = order;
    this.loadingPushOrder = false;
  }
};
