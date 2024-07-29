export const fetchStoreStats = {
  async fetchStoreStats(storeType) {
    try {
      this.loadingStats = true;
      const { userId } = useAuthStore();
      const response = await axiosService.getData(`${userId}/${storeType}/get-dashboard-content`);
      if(response.success) {
        this.storeStats = await response.data;
      }
    } catch (err) {}
    finally {
      this.loadingStats = false;
    }
  }
};
