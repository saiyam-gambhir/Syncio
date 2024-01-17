export const updateAPIKey = {
  async updateAPIKey(consumerKey, consumerSecretKey) {

    try {
      this.loadingAPIKeyUpdate = true;

      const {
        storeId,
      } = useConnectionsStore();
  
      const params = {
        store_id: storeId,
        consumer_key: consumerKey,
        consumer_secret: consumerSecretKey,
      };

      await axiosService.postData(`/wc/2020-01/update-token`, params);
    } catch (err) { } finally {
      this.loadingAPIKeyUpdate = false;
    }
  }
}