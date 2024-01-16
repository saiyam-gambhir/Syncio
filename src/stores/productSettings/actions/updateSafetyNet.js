export const updateSafetyNet = {
  async updateSafetyNet(payload) {
    try {
      this.loading = true;

      const {
          storeId,
        } = useConnectionsStore();

      const params = {
        value: payload
      };
      
      await axiosService.postData(`/stores/${storeId}/inventory-safety-net-add`, params);
    } catch (error) {
      throw new Error(error);
    } finally {
      this.loading = false;
    }
  },
};
  