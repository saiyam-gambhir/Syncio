export const ENABLE_STORE = {
  async ENABLE_STORE() {
    try {
      this.loadingEnableStore = true;
      const { userId } = useAuthStore();
      const response = await axiosService.postData(`user/${userId}/stores/${this.storeId}/profile`);
      // window.location.href = response.charge?.confirmation_url ? response.charge.confirmation_url : window.location.href;
      if(success) {
        await this.fetchCurrentStore();
      }
    } catch (error) {
    } finally {
      this.isEnableUniversalStoreRequested = this.loadingEnableStore = false;
    }
  },
};
