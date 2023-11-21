export const registerUser = {
  async registerUser() {
    const { email, name, passwordConfirmation, password } = this.registrationForm
    this.registrationForm.loading = true;

    const params = {
      email,
      name,
      password_confirmation: passwordConfirmation,
      password,
    };
    const { success, user } = await axiosService.postData('user/register', params);

    if (success) {
      this.user = await user;
      this.registrationForm.loading = false;
    }
  },
};
