export const forgotPassword = {
  async forgotPassword() {
    try {
      this.forgotPasswordForm.loading = true;
      const response = await this.$https.post('forgot-password', {
        email: this.forgotPasswordForm.email,
      });
      this.forgotPasswordForm.emailSent = response?.data.success ?? false;
      if (!response) {
        this.forgotPasswordForm.emailNotFound = true;
      }
    } catch (error) {
      throw new Error(error);
    } finally {
      this.forgotPasswordForm.loading = false;
    }
  },
};
