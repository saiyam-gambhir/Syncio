import router from '@/router';
import * as routes from '@/routes';

export const connectPartnerStore = {
  async connectPartnerStore(storeIdentifier) {
    const params = {
      current_store_id: this.storeId,
      target_store_identifier: storeIdentifier,
    };

    const { success } = await axiosService.postData('stores/connect', params);
    if(router.currentRoute?.value?.name === routes.SHOPIFY_CONNECT_OR_INVITE_STORE || router.currentRoute?.value?.name === routes.STORES) {
      await this.fetchConnections(true);
    }
    return success;
  }
};
