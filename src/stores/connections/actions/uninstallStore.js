export const uninstallStore = {
  async uninstallStore() {
    try {
      this.loadingUninstall = true;

      const params = {
        store_id: this.storeId
      };

      await axiosService.postData(`/uninstall`, params);
    } catch (error) {
      throw new Error(error);
    } finally {
      this.loadingUninstall = false;
    }
  }
};
