import { defineStore } from 'pinia'
import deepmerge from 'deepmerge'

/* ===== ACTIONS ===== */
import { fetchCurrentPlan } from './actions/fetchCurrentPlan'
import { fetchPlans } from './actions/fetchPlans'
import { fetchUser } from './actions/fetchUser'
import { forgotPassword } from './actions/forgotPassword'
import { login } from './actions/login'
import { shopifyLogin } from './actions/shopifyLogin'

export const useAuthStore = defineStore('auth', {
  state: () => {
    return {
      currency: 'USD',
      forgotPasswordForm: { email: 'saiyam+111@syncio.co', emailNotFound: false, emailSent: false, loading: false, submitted: false },
      isAuthenticated: false,
      isBatteryLowDialogVisible: false,
      isNetworkDialogVisible: false,
      isUpgradeDialogRequested: false,
      locales: 'en-US',
      loginForm: { email: '', loading: false, password: '', submitted: false },
      plan: null,
      plans: [],
      registrationForm: { email: '', loading: false, name: '', password: '', passwordConfirmation: '', submitted: false },
      resetPasswordForm: { email: '', loading: false, password: '', passwordConfirmation: '', submitted: false, token: '' },
      timeZone: 'Australia/Melbourne',
      upgradeDialogType: '',
      user: null,
    }
  },

  getters: {
    productsSynced({ plan }) {
      return +plan?.product_mappers_count
    },

    productsSyncedLimit({ plan }) {
      return +plan?.syncio_plan?.sync_product_limit
    },

    userId({ user }) {
      return user?.id
    },

    isOrderModuleAvailable({ plan }) {
      let ordersPlan = plan.active_addons.filter(plan => plan.name === 'Orders')
      return plan.active_addons.length > 0 && ordersPlan.length === 1
    },

    isProductModuleAvailable({ plan }) {
      let settingsPlan = plan.active_addons.filter(plan => plan.name === 'Product Settings')
      return plan.active_addons.length > 0 && settingsPlan.length === 1
    }
  },

  actions: deepmerge.all([
    fetchCurrentPlan,
    fetchPlans,
    fetchUser,
    forgotPassword,
    login,
    shopifyLogin,
  ])
})
