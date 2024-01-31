import deepmerge from 'deepmerge';

/* ----- Actions ----- */
import { continueLater } from './actions/continueLater';
import { fetchUser } from './actions/fetchUser';
import { forgotPassword } from './actions/forgotPassword';
import { login } from './actions/login';
import { loginWoo } from './actions/loginWoo';
import { registerUser } from './actions/registerUser';
import { registerWooStore } from './actions/registerWooStore';
import { resetPassword } from './actions/resetPassword';
import { saveShopifyToken } from './actions/saveShopifyToken';
import { shopifyLogin } from './actions/shopifyLogin';
import { updateStoreType } from './actions/updateStoreType';

export const useAuthStore = defineStore('auth', {
  state: () => {
    return {
      currencies: ['USD'],
      currency: 'USD',
      forgotEmailErrorMessage: null,
      forgotPasswordForm: { emailNotFound: false, emailSent: false, loading: false },
      isAuthenticated: false,
      isBatteryLowDialogVisible: false,
      isNetworkDialogVisible: false,
      isUpgradeDialogRequested: false,
      loadingContinueLater: false,
      loadingResetPassword: false,
      locales: 'en-US',
      loginForm: { loading: false },
      registrationForm: { loading: false },
      showLeavingPageDialog: false,
      timeZone: 'Australia/Melbourne',
      timeZones: [ 'Australia/Melbourne'],
      upgradeDialogType: '',
      user: null,
      wooEmailErrorMessage: null,
      wooPasswordErrorMessage: null,
    };
  },

  getters: {
    userId({ user }) {
      return user?.id;
    },

    showOrdersUpgradeDialog({ upgradeDialogType }) {
      return upgradeDialogType === 'orders';
    },

    showPayoutsUpgradeDialog({ upgradeDialogType }) {
      return upgradeDialogType === 'payouts';
    },

    showProductSettingsUpgradeDialog({ upgradeDialogType }) {
      return upgradeDialogType === 'product-settings';
    },
  },

  actions: deepmerge.all([
    continueLater,
    fetchUser,
    forgotPassword,
    login,
    loginWoo,
    registerUser,
    registerWooStore,
    resetPassword,
    saveShopifyToken,
    shopifyLogin,
    updateStoreType,
  ]),
});
