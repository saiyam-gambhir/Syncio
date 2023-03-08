import { defineStore } from 'pinia'
import deepmerge from 'deepmerge'

/* ===== ACTIONS ===== */
import { fetchSettings } from './actions/fetchSettings'

export const useProductsStore = defineStore('products', {
  state: () => {
    return {
      configrations: []
    }
  },

  getters: {},

  actions: deepmerge.all([
    fetchSettings
  ]),

  persist: {
    enabled: true,
    strategies: [
      {
        key: 'products',
        storage: sessionStorage,
        paths: []
      }
    ]
  }
})
