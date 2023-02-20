export const toggleAutoPush = {
  async toggleAutoPush(storeId) {
    const response = await this.$https.post(`stores/${storeId}/orders/auto-push`)
    return response.data?.message
  }
}
