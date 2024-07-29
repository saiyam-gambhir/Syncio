export const fetchDashboardStats = {
  async fetchDashboardStats() {
    try {
      this.loading = true;
      const { userId } = useAuthStore();
      const { storeType } = useConnectionsStore();
      const response = await axiosService.getData(`${userId}/${storeType}/get-dashboard-content`);
      if(response.success) {
        this.stats = await response.data;
      }
    } catch (err) {}
    finally {
      this.loading = false;
    }
  }
};
