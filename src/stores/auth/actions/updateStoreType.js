export const updateStoreType = {
  async updateStoreType(type) {
    try {
      const { fetchCurrentStore, storeId } = useConnectionsStore();
      const params = { store_id: storeId, type };
      const response = await axiosService.postData('stores/install/set-store-type', params);
      if(response?.success) {
        await fetchCurrentStore();
      }
      return response;
    } catch(error) {
    }
  }
};
