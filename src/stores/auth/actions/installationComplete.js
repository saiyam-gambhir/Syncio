export const installationComplete = {
  async installationComplete() {
    try {
      const { storeId } = useConnectionsStore();
      const params = {
        store_id: storeId
      };
      const response = await axiosService.postData('user/installation-completed', params);
      return response;
    } catch (error) {}
  }
};
