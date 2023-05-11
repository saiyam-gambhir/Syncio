import { defineStore } from 'pinia'
import deepmerge from 'deepmerge'

/* ----- ACTIONS ----- */
import { fetchPaidPayouts } from './actions/api/fetchPaidPayouts'
import { fetchPayableOrders } from './actions/api/fetchPayableOrders'
import { setDateRangeFilter } from './actions/state/setDateRangeFilter'
import { setStatusFilter } from './actions/state/setStatusFilter'

export const usePayoutsStore = defineStore('payouts', {
  state: () => {
    return {
      activeTabIndex: 0,
      dashboardStats: null,
      limiter: 10,
      completePayouts: { items: [], pagination: {} },
      openPayouts: { items: [], pagination: {} },
      paidPayouts: { items: [], loading: true, pagination: {} },
      payableOrders: { items: [], pagination: {} },
      payablePayouts: { items: [], pagination: {} },
      unPaidPayouts: { items: [], loading: true, pagination: {} },
      queries: {
        'filters[date_range]': null,
        'filters[status]': null,
      }
    }
  },

  actions: deepmerge.all([
    fetchPaidPayouts,
    fetchPayableOrders,
    setDateRangeFilter,
    setStatusFilter,
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
