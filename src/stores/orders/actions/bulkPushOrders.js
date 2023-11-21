export const bulkPushOrders = {
  async bulkPushOrders() {
    this.loadingOrders = true;

    const params = {
      order_ref_ids: this.selectedOrders,
      shipping_cost: this.bulkPushShippingCost,
    };
    const { success } = await axiosService.postData(`stores/${this.storeId}/orders/bulk-order-push`, params);

    if(success) {
      const { bulk_push_count, bulk_push, success } = await this.fetchOrders();

      if(success) {
        this.bulkPushCount = bulk_push_count;
        this.isBulkPushActive = bulk_push;
      }
    };
  }
};
