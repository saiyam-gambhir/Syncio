import deepmerge from 'deepmerge';

/* ----- Actions ----- */
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
      currency: 'USD',
      currencies: [
        'USD',
      ],
      forgotPasswordForm: {
        emailNotFound: false,
        emailSent: false,
        loading: false,
      },
      isAuthenticated: false,
      isBatteryLowDialogVisible: false,
      isNetworkDialogVisible: false,
      isUpgradeDialogRequested: false,
      locales: 'en-US',
      loginForm: {
        loading: false,
      },
      registrationForm: {
        loading: false,
      },
      loadingResetPassword: false,
      showLeavingPageDialog: false,
      timeZone: 'Australia/Melbourne',
      timeZones: [
        'Australia/Melbourne',
      ],
      upgradeDialogType: '',
      user: null,
      forgotEmailErrorMessage: null,
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
