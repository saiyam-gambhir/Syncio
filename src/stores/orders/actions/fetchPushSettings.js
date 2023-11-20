import axiosService from '@/composables/axios';

export const fetchPushSettings = {
  async fetchPushSettings(storeId) {
    if (this.pushSettings.length > 0) return;
    const { settings, success } = await axiosService.postData(`stores/${this.storeId}/orders/push-settings`);
    if(success) {
      this.pushSettings = await settings;
    }
  },
};
