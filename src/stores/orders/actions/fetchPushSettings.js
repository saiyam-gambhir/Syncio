export const fetchPushSettings = {
  async fetchPushSettings(storeId) {
    if (this.pushSettings.length > 0) return;
    const response = await this.$https.post(
      `stores/${storeId}/orders/push-settings`
    );
    this.pushSettings = response.data?.settings;
  },
};
