export const updatePushSettings = {
  async updatePushSettings(data, settingId) {
    const params = {
      data: data
    };

    this.loadingSettings = true;
    const response = await axiosService.postData(`stores/${this.storeId}/orders/push-settings/${settingId}`, params);
    if(response?.success) {
      await this.fetchPushSettings();
      this.loadingSettings = false;
    }
  },
};
