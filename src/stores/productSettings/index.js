import { defineStore } from 'pinia'
import deepmerge from 'deepmerge'

/* ===== ACTIONS ===== */
import { fetchSettings } from './actions/fetchSettings'

export const useProductSettingsStore = defineStore('productSettings', {
  state: () => {
    return {
      activeTabIndex: 0,
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
        key: 'productSettings',
        storage: sessionStorage,
        paths: []
      }
    ]
  }
})
