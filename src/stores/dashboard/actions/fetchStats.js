export const fetchStats = {
  async fetchStats() {
    try {
      this.loading = true;
      const { storeId } = useConnectionsStore();
      const response = await axiosService.getData(`stores/${storeId}/get-dashboard-content`);
      if(response.success) {
        this.stats = await response.data;
      }
    } catch (err) {}
    finally {
      this.loading = false;
    }
  }
};
