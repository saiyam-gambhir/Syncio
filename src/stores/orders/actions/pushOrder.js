export const pushOrder = {
  async pushOrder({ orderId, shippingCost, targetStoreId }) {
    try {
      this.loadingOrder = true;
      const { data: { order, success } } = await this.$https.post(`stores/${this.storeId}/orders/${orderId}/push`, {
        shipping_cost: shippingCost,
        target_store_id: targetStoreId,
      });

      if(success) {
        this.order = order;
        await this.fetchOrders();
      }
    } catch(error) {
      console.log(error)
    } finally {
      this.loadingOrder = false;
    }
  }
};
