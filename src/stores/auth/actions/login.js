import * as routes from '@/routes';
import router from '@/router';

export const login = {
  async login(payload) {
    try {
      let storeId = null;
      this.wooEmailErrorMessage = this.wooPasswordErrorMessage = null;
      this.loginForm.loading = true;
      const response = await axiosService.postData('user/login', payload, true);
      if (response.data.success) {
        this.user = await response.data.user;
      }

      if(this.user?.stores[0]) {
        storeId = this.user.stores[0].id;
      }

      if(!response?.data?.woocommerce_healthy) {
        const { isUpdateAPIKeyDialogVisible, wooApiKeyStoreId, } = toRefs(useConnectionsStore());
        wooApiKeyStoreId.value = storeId;
        isUpdateAPIKeyDialogVisible.value = true;
      } else {
        window.sessionStorage.setItem('ID_TOKEN_KEY', response.headers['x-syncio-app-token']);
        if (window.sessionStorage.getItem('ID_TOKEN_KEY')) {
          this.isAuthenticated = true;
          sessionStorage.setItem('USER_ID', this.user?.id);
          axiosService.https.defaults.headers.common['Authorization'] = `Bearer ${sessionStorage.getItem('ID_TOKEN_KEY')}`;
          storeId ? router.push({ name: routes.DASHBOARD }) : router.push({ name: routes.WOO_SELECT_STORE_TYPE });
          const connections = useConnectionsStore();
          const plan = usePlanStore();
          const { stores } = await connections.fetchCurrentStore();

          if(stores.length > 0) {
            await plan.fetchCurrentPlan(this.user?.id);
          }
        }
      }
    } catch (error) {
    } finally {
      this.loginForm.loading = false;
    }
  },
};

/* Update api - pending */
// if (!data.woocommerce_healthy && Object.prototype.hasOwnProperty.call(data, "woocommerce_healthy")) {
//   this.isRefreshAPIDialogVisible = true
//   this.$store.dispatch(`shop/init`)
// }
