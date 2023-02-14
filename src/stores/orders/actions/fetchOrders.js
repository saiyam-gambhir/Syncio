export const fetchOrders = {
  async fetchOrders(storeId) {
    const response = await this.$https(`stores/${storeId}/orders`, {
      params: {
        page: 1
      }
    })

    this.orders = await response.data?.orders?.orders
  }
}
