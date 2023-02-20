export const fetchPushSettings = {
  async fetchPushSettings(storeId) {
    const response = await this.$https.post(`stores/${storeId}/orders/push-settings`)
    this.pushSettings = response.data?.settings
  }
}
