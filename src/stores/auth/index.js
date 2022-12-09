import deepmerge from 'deepmerge'
import { defineStore } from 'pinia'
import { login } from './actions/login'

export const useAuthStore = defineStore('auth', {
  state: () => {
    return {
      email: 'fei-test-store@syncio.co',
      isAuthenticated: false,
      password: 'syncio1234',
    }
  },

  actions: deepmerge.all([
    login,
  ])
})
