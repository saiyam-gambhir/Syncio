export const fetchOrder = {
  async fetchOrder(orderId) {
    this.loadingOrder = true;
    const response = await this.$https(`stores/${this.storeId}/orders/${orderId}`);
    this.order = await response.data.order;
    this.loadingOrder = false;
  },
};
