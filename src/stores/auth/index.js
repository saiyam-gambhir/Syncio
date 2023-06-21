import { defineStore } from 'pinia';
import deepmerge from 'deepmerge';

/* ----- Actions ----- */
import { fetchCurrentPlan } from './actions/fetchCurrentPlan';
import { fetchPlans } from './actions/fetchPlans';
import { fetchUser } from './actions/fetchUser';
import { forgotPassword } from './actions/forgotPassword';
import { login } from './actions/login';
import { shopifyLogin } from './actions/shopifyLogin';

export const useAuthStore = defineStore('auth', {
  state: () => {
    return {
      currency: 'USD',
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
      loginForm: { email: '', loading: false, password: '', submitted: false },
      plan: null,
      plans: [],
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
      timeZone: 'Australia/Melbourne',
      upgradeDialogType: '',
      user: null,
    };
  },

  getters: {
    productsSynced({ plan }) {
      return +plan?.product_mappers_count || 0;
    },

    productsSyncedLimit({ plan }) {
      return +plan?.syncio_plan?.sync_product_limit || 0;
    },

    userId({ user }) {
      return user?.id;
    },

    isOrderModuleAvailable({ plan }) {
      let ordersPlan = plan?.active_addons.filter(
        plan => plan.name === 'Orders'
      );
      return ordersPlan?.length === 1;
    },

    isPayoutsModuleAvailable({ plan }) {
      let payoutsPlan = plan?.active_addons.filter(
        plan => plan.name === 'Payouts'
      );
      return payoutsPlan?.length === 1;
    },

    isProductModuleAvailable({ plan }) {
      let settingsPlan = plan?.active_addons.filter(
        plan => plan.name === 'Product Settings'
      );
      return settingsPlan?.length === 1;
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
    fetchCurrentPlan,
    fetchPlans,
    fetchUser,
    forgotPassword,
    login,
    shopifyLogin,
  ]),
});
