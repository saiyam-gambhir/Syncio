import { useConnectionsStore } from 'connections';
import { usePlanStore } from 'plan';
import * as routes from '@/routes';
import router from '@/router';

export const shopifyLogin = {
  async shopifyLogin(platform, storeName) {
    this.loginForm.loading = true;
    const { fetchCurrentStore } = useConnectionsStore();
    const { fetchCurrentPlan } = usePlanStore();

    const params = {
      platform: platform,
      store_name: storeName,
    };
    const { data: { success, user }, headers } = await axiosService.postData('user/platforms/login', params, true);

    if (success) {
      this.user = await user;
    }
    window.sessionStorage.setItem('ID_TOKEN_KEY', headers['x-syncio-app-token']);
    if (window.sessionStorage.getItem('ID_TOKEN_KEY')) {
      this.isAuthenticated = true;
      sessionStorage.setItem('USER_ID', this.user?.id);
      this.$https.defaults.headers.common['Authorization'] = `Bearer ${sessionStorage.getItem('ID_TOKEN_KEY')}`;
      await fetchCurrentStore();
      await fetchCurrentPlan(sessionStorage.getItem('USER_ID'));
      router.replace({ name: routes.DASHBOARD });
      this.loginForm.loading = false;
    }
  },
};
