export const resetPassword = {
  async resetPassword(params) {
    try {
      this.loadingResetPassword = true;
      const response = await axiosService.postData('reset-password', params);
      return response;
    } catch (error) {
    } finally {
      this.loadingResetPassword = false;
    }
  },
};
