export const fetchDashboard = {
  async fetchDashboard(storeId) {
    const response = await this.$https('stores/get-dashboard-content', {
      params: {
        current_store_id: storeId
      }
    })
    this.$state = { ...response.data }
  }
}
