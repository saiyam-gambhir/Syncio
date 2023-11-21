export const fetchOrder = {
  async fetchOrder(orderId) {
    this.loadingOrder = true;
    const { order } = await axiosService.getData(`stores/${this.storeId}/orders/${orderId}`);
    this.order = await order;
    this.loadingOrder = false;
  },
};
