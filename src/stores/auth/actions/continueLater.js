export const continueLater = {
  async continueLater() {
    try {
      this.loadingContinueLater = true;

      const params = {
        user_id: this.userId
      };
      const response = await axiosService.postData('user/continue-install-email-send', params);
      return response;
    } catch (error) {
    } finally {
      this.loadingContinueLater = false;
    }
  },
};
