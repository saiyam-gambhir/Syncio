export const saveShoplineToken = {
  async saveShoplineToken(params) {
    try {
      const response = await axiosService.postData('shopline/save-token', params);

      if(response?.success) {
        const { platform, store_name } = response;
        await this.shoplineLogin(platform, store_name);
      }

    } catch(error) {}
  }
};
