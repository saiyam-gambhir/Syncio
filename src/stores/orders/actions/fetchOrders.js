export const fetchOrders = {
  async fetchOrders(page = 1) {
    this.loadingOrders = true;
    this.isBulkPushActive = false;
    const { searchString, sortBy } = this.filters;
    const response = await this.$https(`stores/${this.storeId}/orders`, {
      params: {
        page,
        searchStr: searchString,
        sortBy: sortBy,
      },
    });

    this.orders = await response.data?.orders?.orders;
    this.loadingOrders = false;
    this.ordersCollection = this.orders.map(order => order.id);
    return response;
  },
};
