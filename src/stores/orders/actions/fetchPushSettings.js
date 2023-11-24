export const fetchPushSettings = {
  async fetchPushSettings() {
    this.loadingSettings = true;
    const response = await axiosService.postData(`stores/${this.storeId}/orders/push-settings`);
    if(response?.success) {
      this.pushSettings = await response.settings;

      this.pushOrderEmailSettings = this.pushSettings.find(setting => setting.key === 'push_order_email_option');
      this.stringifyPushOrderEmailSettings = JSON.parse(JSON.stringify(this.pushOrderEmailSettings));

      this.loadingSettings = false;
    }
  },
};
