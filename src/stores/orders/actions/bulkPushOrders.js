export const bulkPushOrders = {
  async bulkPushOrders() {
    this.loadingOrders = true;
    const { data: { success } } = await this.$https.post(`stores/${this.storeId}/orders/bulk-order-push`, {
      order_ref_ids: this.selectedOrders,
      shipping_cost: this.bulkPushShippingCost,
    });

    if(success) {
      const { data: { bulk_push_count, bulk_push, success } } = await this.fetchOrders(this.storeId);

      if(success) {
        this.bulkPushCount = bulk_push_count;
        this.isBulkPushActive = bulk_push;
      }
    };
  }
};
