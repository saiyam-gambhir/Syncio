export const updateAPIKey = {
  async updateAPIKey(consumerKey, consumerSecretKey) {

    try {
      this.loadingAPIKeyUpdate = true;

      const params = {
        store_id: this.storeId,
        consumer_key: consumerKey,
        consumer_secret: consumerSecretKey,
      };

      await axiosService.postData(`/wc/2020-01/update-token`, params);
      this.isUpdateAPISuccess = true;
    } catch (err) {
      this.isInvalidKey = true;
    } finally {
      this.loadingAPIKeyUpdate = false;
    }
  }
}
