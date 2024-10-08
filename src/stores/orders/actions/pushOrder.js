export const pushOrder = {
  async pushOrder({ orderId, shippingCost, targetStoreId }) {
    try {
      this.loadingOrder = true;

      const params = {
        shipping_cost: shippingCost,
        target_store_id: targetStoreId,
      };
      const { order, success } = await axiosService.postData(`stores/${this.storeId}/orders/${orderId}/push`, params);

      if(success) {
        this.order = await order;
        await this.fetchOrders();
      }

      return success;
    } catch(error) {
    } finally {
      this.loadingOrder = false;
    }
  }
};
