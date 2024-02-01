export const saveShopifyToken = {
  async saveShopifyToken(params) {
    try {
      const response = await axiosService.postData('shopify/2020-01/save-token', params);

      if(response?.success) {
        const { platform, store_name } = response;
        await this.shopifyLogin(platform, store_name);
      }

    } catch(error) {
    }
  }
};
