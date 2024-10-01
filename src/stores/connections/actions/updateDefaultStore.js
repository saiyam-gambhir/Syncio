export const updateDefaultStore = {
  async updateDefaultStore() {
    try {
      this.loadingDefaultStoreUpdate = true;
      const { userId } = useAuthStore();
      const { success } = await axiosService.postData(`user/${userId}/stores/${this.storeId}/set-default-store`);
      if(success) {
        await this.fetchCurrentStore();
      }
    } catch (err) {}
    finally {
      this.loadingDefaultStoreUpdate = false;
    }
  }
};
