import * as routes from '@/routes';

export const updateAPIKey = {
  async updateAPIKey(consumerKey, consumerSecretKey, redirectToDashboard) {

    try {
      this.loadingAPIKeyUpdate = true;

      const params = {
        store_id: this.wooApiKeyStoreId ?? this.storeId,
        consumer_key: consumerKey,
        consumer_secret: consumerSecretKey,
      };

      await axiosService.postData(`/wc/2020-01/update-token`, params);
      const router = useRouter();

      if(redirectToDashboard) {
        router.push({
          path: routes.DASHBOARD,
          params: { 'wooUpdate': true },
        });
      };
      this.isUpdateAPISuccess = true;
    } catch (err) {
      this.isInvalidKey = true;
    } finally {
      this.loadingAPIKeyUpdate = false;
    }
  }
}
