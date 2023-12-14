import * as routes from '@/routes';
import router from '@/router';

export const login = {
  async login(payload) {
    this.loginForm.loading = true;
    const connections = useConnectionsStore();
    const plan = usePlanStore();
    const response = await axiosService.postData('user/login', payload, true);
    if (response.data.success) {
      this.user = await response.data.user;
    }

    window.sessionStorage.setItem('ID_TOKEN_KEY', response.headers['x-syncio-app-token']);
    if (window.sessionStorage.getItem('ID_TOKEN_KEY')) {
      this.isAuthenticated = true;
      sessionStorage.setItem('USER_ID', this.user?.id);
      axiosService.https.defaults.headers.common['Authorization'] = `Bearer ${sessionStorage.getItem('ID_TOKEN_KEY')}`;
      await connections.fetchCurrentStore();
      await plan.fetchCurrentPlan(sessionStorage.getItem('USER_ID'));
      router.replace({ name: routes.DASHBOARD });
      this.loginForm.loading = false;
    }
  },
};
