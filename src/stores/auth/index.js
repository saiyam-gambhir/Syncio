import { defineStore } from 'pinia'
import deepmerge from 'deepmerge'

/* ===== ACTIONS ===== */
import { fetchCurrentPlan } from './actions/fetchCurrentPlan'
import { fetchUser } from './actions/fetchUser'
import { login } from './actions/login'
import { shopifyLogin } from './actions/shopifyLogin'

export const useAuthStore = defineStore('auth', {
  state: () => {
    return {
      currency: 'USD',
      email: 'fei-test-store@syncio.co',
      isAuthenticated: false,
      loading: false,
      locales: 'en-US',
      password: 'syncio1234',
      plan: null,
      user: null,
    }
  },

  getters: {
    productsSynced(state) {
      return +state.plan?.product_mappers_count
    },

    productsSyncedLimit(state) {
      return +state.plan?.syncio_plan?.sync_product_limit
    }
  },

  actions: deepmerge.all([
    fetchCurrentPlan,
    fetchUser,
    login,
    shopifyLogin,
  ]),
})
