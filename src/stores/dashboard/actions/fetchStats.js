export const fetchStats = {
  async fetchStats() {
    try {
      this.loading = true;
      const { userId } = useAuthStore();
      const { storeType } = useConnectionsStore();
      const response = await axiosService.getData(`${userId}/${storeType}/get-dashboard-content`);
      debugger
      if(response.success) {
        this.stats = await response.data;
      }
    } catch (err) {}
    finally {
      this.loading = false;
    }
  }
};
