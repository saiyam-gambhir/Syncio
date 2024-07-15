export const fetchOrders = {
  async fetchOrders(page = 1, isLoadMore = false) {
    !isLoadMore ? this.loadingOrders = true : this.loadingMoreOrders = true;
    this.isBulkPushActive = false;
    const { searchString, sortBy, status } = this.filters;
    const params = {
      status: status,
      page,
      searchStr: searchString,
      sortBy: sortBy,
    };
    const { orders } = await axiosService.getData(`stores/${this.storeId}/orders`, params);
    this.orders = !isLoadMore ? await orders?.orders : [...this.orders, ...orders.orders];
    this.pagination = await orders?.pagination;
    this.ordersCollection = this.orders.map(order => order.id);
    this.loadingOrders = this.loadingMoreOrders = false;
    return orders;
  }
};
