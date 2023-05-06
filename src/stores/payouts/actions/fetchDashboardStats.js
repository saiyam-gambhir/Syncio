export const fetchDashboardStats = {
  async fetchDashboardStats(storeId) {
    if(this.dashboardStats) return

    try {
      const { data } = await this.$https(`stores/payout/dashboard-stats/${storeId}`)
      const { success, dashboardStats } = data
      if(success) this.dashboardStats = dashboardStats
    } catch (error) {
      throw new Error(error)
    }
  }
}
