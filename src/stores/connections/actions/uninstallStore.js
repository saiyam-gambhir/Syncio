export const uninstallStore = {
    async uninstallStore() {
      try {
        this.loadingUninstall = true;
  
        const {
          storeId,
        } = useConnectionsStore();
  
        const params = {
          store_id: storeId
        };
        
        await axiosService.postData(`/uninstall`, params);
      } catch (error) {
        throw new Error(error);
      } finally {
        this.loadingUninstall = false;
      }
    },
  };
  