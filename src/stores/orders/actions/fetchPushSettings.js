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
      this.shippingTags = [];
      for(var tag of Object.entries(JSON.parse(this.pushOrderShippingTags.value))) {
        this.shippingTags.push({
          editMode: false,
          key: tag[0],
          value: tag[1][0],
        });
      };
      this.stringifyPushOrderShippingTags = JSON.stringify(this.shippingTags);

      this.loadingSettings = false;
    }
  },
};
