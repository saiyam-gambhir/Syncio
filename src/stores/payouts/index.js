import { defineStore } from 'pinia'
import deepmerge from 'deepmerge'

/* ===== ACTIONS ===== */
import { fetchDashboardStats } from './actions/fetchDashboardStats'

export const usePayoutsStore = defineStore('payouts', {
  state: () => {
    return {
      activeTabIndex: 0,
      dashboardStats: null
    }
  },

  actions: deepmerge.all([
    fetchDashboardStats,
  ]),

  persist: {
    enabled: true,
    strategies: [
      {
        key: 'payouts',
        storage: sessionStorage,
        paths: [
          'activeTabIndex',
        ]
      }
    ]
  }
})
