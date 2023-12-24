import * as routes from '@/routes';
import router from '@/router';

export const login = {
  async login(payload) {
    const storeId = null;
    this.loginForm.loading = true;
    const response = await axiosService.postData('user/login', payload, true);
    if (response.data.success) {
      this.user = await response.data.user;
    }

    if(this.user?.stores[0]) {
      storeId = this.user.stores[0].id;
    }

    window.sessionStorage.setItem('ID_TOKEN_KEY', response.headers['x-syncio-app-token']);
    if (window.sessionStorage.getItem('ID_TOKEN_KEY')) {
      this.isAuthenticated = true;
      sessionStorage.setItem('USER_ID', this.user?.id);
      axiosService.https.defaults.headers.common['Authorization'] = `Bearer ${sessionStorage.getItem('ID_TOKEN_KEY')}`;
      storeId ? router.push({ name: routes.DASHBOARD }) : router.push({ name: routes.WOO_SELECT_STORE_TYPE });
      this.loginForm.loading = false;
    }
  },
};

//       /* Discuss with Fei */
//       if (!data.woocommerce_healthy && Object.prototype.hasOwnProperty.call(data, "woocommerce_healthy")) {
//         this.isRefreshAPIDialogVisible = true
//         this.$store.dispatch(`shop/init`)
//       } else if (!this.store_id) {
//         this.$router.push({ name: "registration.woocommerce.select-store-type" })
//       } else {
//         this.$router.push({ name: "DashboardPage", params: { "wooUpdate":"true" }})
//       }
