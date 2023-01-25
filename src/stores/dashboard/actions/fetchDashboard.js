export const fetchDashboard = {
  async fetchDashboard(storeId) {
    this.loading = true
    const response = await this.$https('stores/get-dashboard-content', {
      params: {
        current_store_id: storeId
      }
    })
    this.$state = await { ...response.data }
    this.loading = false
  }
}
