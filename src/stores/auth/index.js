import deepmerge from 'deepmerge';

/* ----- Actions ----- */
import { fetchUser } from './actions/fetchUser';
import { forgotPassword } from './actions/forgotPassword';
import { login } from './actions/login';
import { registerUser } from './actions/registerUser';
import { saveShopifyToken } from './actions/saveShopifyToken';
import { shopifyLogin } from './actions/shopifyLogin';
import { updateStoreType } from './actions/updateStoreType';

export const useAuthStore = defineStore('auth', {
  state: () => {
    return {
      currency: 'USD',
      currencies: [
        'USD',
        'AUD',
        'INR',
      ],
      forgotPasswordForm: {
        email: '',
        emailNotFound: false,
        emailSent: false,
        loading: false,
        submitted: false,
      },
      isAuthenticated: false,
      isBatteryLowDialogVisible: false,
      isNetworkDialogVisible: false,
      isUpgradeDialogRequested: false,
      locales: 'en-US',
      loginForm: {
        email: '',
        loading: false,
        password: '',
        submitted: false
      },
      registrationForm: {
        loading: false,
      },
      resetPasswordForm: {
        email: '',
        loading: false,
        password: '',
        passwordConfirmation: '',
        submitted: false,
        token: '',
      },
      showLeavingPageDialog: false,
      timeZone: 'America/Los_Angeles',
      timeZones: [
        'America/Los_Angeles',
        'America/New_York',
        'Asia/Kolkata',
        'Australia/Melbourne',
      ],
      upgradeDialogType: '',
      user: null,
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
    registerUser,
    saveShopifyToken,
    shopifyLogin,
    updateStoreType,
  ]),

  // persist: {
  //   enabled: true,
  //   strategies: [
  //     {
  //       key: 'auth',
  //       storage: sessionStorage,
  //       paths: [
  //         'user'
  //       ],
  //     },
  //   ],
  // },
});
