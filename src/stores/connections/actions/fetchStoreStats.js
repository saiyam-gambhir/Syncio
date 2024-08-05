export const fetchStoreStats = {
  async fetchStoreStats(storeType, userId) {
    try {
      this.loadingStats = true;
      const response = await axiosService.getData(`user/${userId}/${storeType}/get-dashboard-content`);
      return response?.data;
    } catch (err) {}
    finally {
      this.loadingStats = false;
    }
  }
};
