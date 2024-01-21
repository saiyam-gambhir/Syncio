export const forgotPassword = {
  async forgotPassword(emailAddress) {
    try {
      this.forgotPasswordForm.loading = true;

      const params = {
        email: emailAddress,
      };
      const { success } = await axiosService.postData('forgot-password', params);
      this.forgotPasswordForm.emailSent = success ?? false;
      if (!success) {
        this.forgotEmailErrorMessage = 'Account not found, try another email';
      }
    } catch (error) {
      this.forgotEmailErrorMessage = 'Account not found, try another email';
    } finally {
      this.forgotPasswordForm.loading = false;
    }
  },
};
