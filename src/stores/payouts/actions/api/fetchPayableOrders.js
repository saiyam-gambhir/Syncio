export const fetchPayableOrders = {
  async fetchPayableOrders(storeId) {
    try {
      const response = await this.$https(`stores/payout/all-store-data/${storeId}`)
      const { payableOrders, success } = response.data
      if(success) this.payableOrders.orders = payableOrders
    } catch (error) {
      throw new Error(error)
    }
  }
}
