export const fetchStoreStats = {
  async fetchStoreStats(storeId) {
    try {
      this.loadingStats = true;
      const response = await axiosService.getData(`stores/${storeId}/get-dashboard-content`);
      return response?.data;
    } catch (err) {}
    finally {
      this.loadingStats = false;
    }
  }
};
