import { defineStore } from 'pinia'
import deepmerge from 'deepmerge'

/* ===== ACTIONS ===== */
import { fetchCurrentPlan } from './actions/fetchCurrentPlan'
import { fetchUser } from './actions/fetchUser'
import { forgotPassword } from './actions/forgotPassword'
import { login } from './actions/login'
import { shopifyLogin } from './actions/shopifyLogin'

export const useAuthStore = defineStore('auth', {
  state: () => {
    return {
      currency: 'USD',
      isAuthenticated: false,
      locales: 'en-US',
      plan: null,
      timeZone: 'Australia/Melbourne',
      user: null,
      loginForm: { email: '', loading: false, password: '', submitted: false },
      forgotPasswordForm: { email: 'saiyam+111@syncio.co', emailNotFound: false, emailSent: false, loading: false, submitted: false },
      resetPasswordForm: { email: '', loading: false, password: '', passwordConfirmation: '', submitted: false, token: '' },
      registrationForm: { email: '', loading: false, name: '', password: '', passwordConfirmation: '', submitted: false },
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
    fetchUser,
    forgotPassword,
    login,
    shopifyLogin,
  ]),
})
