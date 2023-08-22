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
      isOnboarding: false,
      isUpgradeDialogRequested: false,
      locales: 'en-US',
      loginForm: {
        email: '',
        loading: false,
        password: '',
        submitted: false
      },
      plan: null,
      selectedPlan: null,
      selectedAddonIds: null,
      plans: null,
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

    ordersPushed() {
      return this.activeAddons?.order?.current_usage;
    },

    ordersPushLimit() {
      return this.activeAddons?.order?.usage_count_limit;
    },

    payoutsProcessed() {
      return this.activeAddons?.payout?.current_usage;
    },

    payoutsProcessLimit() {
      return this.activeAddons?.payout?.usage_count_limit;
    },

    userId({ user }) {
      return user?.id;
    },

    activeAddons({ plan }) {
      let order = null;
      let payout = null;
      let product = null;

      plan?.active_addons.forEach(addon => {
        switch (addon.name) {
          case 'Orders':
            order = { ...addon };
            break;
          case 'Payouts':
            payout = { ...addon };
            break;
          default:
            product = { ...addon };
        }
      });

      return {
        order,
        payout,
        product,
      };
    },

    isOrderModuleAvailable({ plan }) {
      let ordersPlan = plan?.active_addons.filter(plan => plan.name === 'Orders')[0];
      return ordersPlan?.price_per_month > 0;
    },

    isPayoutsModuleAvailable({ plan }) {
      let payoutsPlan = plan?.active_addons.filter(plan => plan.name === 'Payouts')[0];
      return payoutsPlan?.price_per_month > 0;
    },

    isProductModuleAvailable({ plan }) {
      let settingsPlan = plan?.active_addons.filter(plan => plan.name === 'Product Settings')[0];
      return settingsPlan?.price_per_month > 0;
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

    getCurrentPlanId({ selectedPlan }) {
      return selectedPlan?.id;
    }
  },

  actions: deepmerge.all([
    fetchCurrentPlan,
    fetchPlans,
    fetchUser,
    forgotPassword,
    login,
    shopifyLogin,
  ]),

  persist: {
    enabled: true,
    strategies: [
      {
        key: 'auth',
        storage: sessionStorage,
        paths: [
          'plans',
        ],
      },
    ],
  },
});
