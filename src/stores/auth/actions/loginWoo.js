export const loginWoo = {
  async loginWoo(payload) {
    const response = await axiosService.postData('wc/2020-01/jwt-login', payload);
    return response;
  },
};
