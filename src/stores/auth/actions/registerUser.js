import * as routes from '@/routes';
import router from '@/router';

export const registerUser = {
  async registerUser() {
    try {
      const { email, name, passwordConfirmation, password } = this.registrationForm;
      this.registrationForm.loading = true;

      const params = {
        email,
        name,
        password_confirmation: passwordConfirmation,
        password,
      };
      const response = await axiosService.postData('user/register', params, true);

      if(response.data.success) {
        this.user = await response.data.user;
        this.registrationForm.loading = false;
      }

      window.sessionStorage.setItem('ID_TOKEN_KEY', response.headers['x-syncio-app-token']);
      if (window.sessionStorage.getItem('ID_TOKEN_KEY')) {
        this.isAuthenticated = true;
        sessionStorage.setItem('USER_ID', this.user?.id);
        axiosService.https.defaults.headers.common['Authorization'] = `Bearer ${sessionStorage.getItem('ID_TOKEN_KEY')}`;
        router.push({ name: routes.WOO_SELECT_STORE_TYPE });
      }
    } catch (error) {
      this.registrationForm.loading = false;
    }
  },
};
