export const fetchDashboardStats = {
  async fetchDashboardStats(storeId) {
    try {
      const { data } = await this.$https(`stores/payout/dashboard-stats/${storeId}`)
      const { success, dashboardStats } = data
      if(success) this.dashboardStats = dashboardStats
    } catch (error) {
      throw new Error(error)
    }
  }
}
