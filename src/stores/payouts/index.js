import { defineStore } from 'pinia'
import deepmerge from 'deepmerge'

/* ----- ACTIONS ----- */
import { fetchDashboardStats } from './actions/fetchDashboardStats'
import { fetchPayableOrders } from './actions/fetchPayableOrders'

export const usePayoutsStore = defineStore('payouts', {
  state: () => {
    return {
      activeTabIndex: 0,
      dashboardStats: null,
      payableOrders: {
        filters: {},
        orders: [],
        pagination: {},
      },
    }
  },

  actions: deepmerge.all([
    fetchDashboardStats,
    fetchPayableOrders,
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
