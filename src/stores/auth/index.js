import { defineStore } from 'pinia'
import deepmerge from 'deepmerge'

/* ===== ACTIONS ===== */
import { fetchCurrentPlan } from './actions/fetchCurrentPlan'
import { fetchUser } from './actions/fetchUser'
import { login } from './actions/login'

export const useAuthStore = defineStore('auth', {
  state: () => {
    return {
      email: 'fei-test-store@syncio.co',
      isAuthenticated: false,
      password: 'syncio1234',
      plan: null,
      user: null,
    }
  },

  actions: deepmerge.all([
    fetchCurrentPlan,
    fetchUser,
    login,
  ]),
})
