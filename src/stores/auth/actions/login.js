import router from '@/router';
import { useConnectionsStore } from 'connections';

export const login = {
  async login(payload) {
    this.loginForm.loading = true;
    const connections = useConnectionsStore();
    const response = await this.$https.post('user/login', { ...payload });
    const { success, user } = response.data;
    if (success) {
      this.user = await user;
    }

    window.sessionStorage.setItem(
      'ID_TOKEN_KEY',
      response.headers['x-syncio-app-token']
    );
    if (window.sessionStorage.getItem('ID_TOKEN_KEY')) {
      this.isAuthenticated = true;
      sessionStorage.setItem('USER_ID', this.user?.id);
      this.$https.defaults.headers.common[
        'Authorization'
      ] = `Bearer ${sessionStorage.getItem('ID_TOKEN_KEY')}`;
      await connections.fetchCurrentStore();
      await this.fetchCurrentPlan(sessionStorage.getItem('USER_ID'));
      router.replace('/');
      this.loginForm.loading = false;
    }
  },
};
