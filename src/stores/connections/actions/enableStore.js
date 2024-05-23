export const ENABLE_STORE = {
  async ENABLE_STORE() {
    try {
      this.loadingEnableStore = true;
      const { userId } = useAuthStore();
      const { success } = await axiosService.postData(`user/${userId}/stores/${this.storeId}/profile`);
      if(success) {
        await this.fetchCurrentStore();
      }
    } catch (error) {
    } finally {
      this.isEnableUniversalStoreRequested = this.loadingEnableStore = false;
    }
  },
};
