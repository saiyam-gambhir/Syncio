import deepmerge from 'deepmerge';

/* ----- Actions ----- */
import { fetchUser } from './actions/fetchUser';
import { forgotPassword } from './actions/forgotPassword';
import { login } from './actions/login';
import { registerUser } from './actions/registerUser';
import { shopifyLogin } from './actions/shopifyLogin';

export const useAuthStore = defineStore('auth', {
  state: () => {
    return {
      currency: 'INR',
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
        email: '',
        loading: false,
        name: '',
        password: '',
        passwordConfirmation: '',
        submitted: false,
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
      timeZone: 'Asia/Kolkata',
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
    shopifyLogin,
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
