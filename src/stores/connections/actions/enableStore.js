export const enableStore = {
  async enableStore() {
    try {
      this.loadingEnableStore = true;
      const { userId } = useAuthStore();
      const response = await axiosService.postData(`user/${userId}/stores/${this.storeId}/profile`);

      if(response.success) {
        await this.fetchCurrentStore();
      }
    } catch (error) {
    } finally {
      this.isEnableUniversalStoreRequested = this.loadingEnableStore = false;
    }
  },
};
