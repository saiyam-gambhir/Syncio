export const updatePushSettings = {
  async updatePushSettings(data, settingId, isShippingTags = false) {
    let params = null;
    let url = null;

    if(isShippingTags) {
      params = { custom_shipping_tags: data };
      url = `stores/${this.storeId}/orders/custom-shipping-tags/update`
    } else {
      params = { data: data };
      url = `stores/${this.storeId}/orders/push-settings/${settingId}`
    }

    this.loadingSettings = true;
    const response = await axiosService.postData(url, params);
    if(response?.success) {
      await this.fetchPushSettings();
      this.loadingSettings = false;
    }
  },
};
