export const fetchOrders = {
  async fetchOrders(page = 1, isLoadMore = false) {
    !isLoadMore ? this.loadingOrders = true : this.loadingMoreOrders = true;
    this.isBulkPushActive = false;
    const { searchString, sortBy } = this.filters;
    const response = await this.$https(`stores/${this.storeId}/orders`, {
      params: {
        page,
        searchStr: searchString,
        sortBy: sortBy,
      },
    });

    this.orders = !isLoadMore ? await response.data?.orders?.orders : [...this.orders, ...response.data?.orders?.orders];
    this.pagination = await response.data?.orders?.pagination;
    this.ordersCollection = this.orders.map(order => order.id);
    this.loadingOrders = this.loadingMoreOrders = false;
    return response;
  }
};
