export const fetchPushSettings = {
  async fetchPushSettings() {
    this.loadingSettings = true;
    const response = await axiosService.postData(`stores/${this.storeId}/orders/push-settings`);
    if(response?.success) {
      this.pushSettings = await response.settings;

      this.pushOrderEmailSettings = await this.pushSettings.find(setting => setting.key === 'push_order_email_option');
      this.stringifyPushOrderEmailSettings = JSON.stringify(this.pushOrderEmailSettings);

      this.pushOrderShippingRules = await this.pushSettings.find(setting => setting.key === 'push_order_shipping_rules');
      this.stringifyPushOrderShippingRules = JSON.stringify(this.pushOrderShippingRules);

      this.pushOrderShippingTags = await this.pushSettings.find(setting => setting.key === 'custom_shipping_tags');
      this.stringifyPushOrderShippingTags = JSON.stringify(this.pushOrderShippingTags);

      this.loadingSettings = false;
    }
  },
};
