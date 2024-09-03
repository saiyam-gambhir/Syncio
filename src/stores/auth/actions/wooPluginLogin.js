import * as routes from '@/routes';
import router from '@/router';

export const wooPluginLogin = {
  async wooPluginLogin(payload) {
    const response = await axiosService.postData('wc/login', payload, true);
    if (response.data.success) {
      this.isAuthenticated = true;

      this.user = response.data.user;

      window.sessionStorage.setItem('ID_TOKEN_KEY', response.headers['x-syncio-app-token']);
      sessionStorage.setItem('USER_ID', this.user?.id);

      axiosService.https.defaults.headers.common['Authorization'] = `Bearer ${sessionStorage.getItem('ID_TOKEN_KEY')}`;

      router.push({ name: routes.DASHBOARD});

      const connections = useConnectionsStore();
      const plan = usePlanStore();
      const { stores } = await connections.fetchCurrentStore();

      if(stores.length > 0) {
        await plan.fetchCurrentPlan(this.user?.id);
      }
    }
  },
};
  