import { defineStore } from 'pinia'
import deepmerge from 'deepmerge'

/* ----- ACTIONS ----- */
import { fetchPayableOrders } from './actions/api/fetchPayableOrders'

export const usePayoutsStore = defineStore('payouts', {
  state: () => {
    return {
      activeTabIndex: 0,
      payableOrders: {
        filters: {},
        orders: [],
        pagination: {},
      },
    }
  },

  actions: deepmerge.all([
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
