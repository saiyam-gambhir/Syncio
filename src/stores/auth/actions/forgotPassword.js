import axiosService from '@/composables/axios';

export const forgotPassword = {
  async forgotPassword() {
    try {
      this.forgotPasswordForm.loading = true;

      const params = {
        email: this.forgotPasswordForm.email,
      };
      const { success } = await axiosService.postData('forgot-password', params);
      this.forgotPasswordForm.emailSent = success ?? false;
      if (!success) {
        this.forgotPasswordForm.emailNotFound = true;
      }
    } catch (error) {
      this.forgotPasswordForm.emailNotFound = true;
      throw new Error(error);
    } finally {
      this.forgotPasswordForm.loading = false;
    }
  },
};
