export const fetchOrder = {
  async fetchOrder(storeId, orderId) {
    this.loadingOrder = true
    const response = await this.$https(`stores/${storeId}/orders/${orderId}`)
    this.order = await response.data.order
    this.loadingOrder = false
  }
}
