export const registerUser = {
  async registerUser() {
    const { email, name, passwordConfirmation, password } = this.registrationForm
    this.registrationForm.loading = true;

    const { data: { success, user } } = await this.$https.post('user/register', {
      email,
      name,
      password_confirmation: passwordConfirmation,
      password,
    });

    if (success) {
      this.user = await user;
      this.registrationForm.loading = false;
    }
  },
};
