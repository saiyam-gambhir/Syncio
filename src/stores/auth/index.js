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
      email: '',
      isAuthenticated: false,
      loading: false,
      locales: 'en-US',
      password: '',
      plan: null,
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
    }
  },

  actions: deepmerge.all([
    fetchCurrentPlan,
    fetchUser,
    login,
    shopifyLogin,
  ]),
})
