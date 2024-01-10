export const registerWooStore = {
  async registerWooStore(params) {
    try {
      const response = await axiosService.postData('stores/create', params);
      return response;
    } catch(error) {
    }
  }
};
