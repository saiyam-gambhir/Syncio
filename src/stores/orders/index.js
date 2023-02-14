import { defineStore } from 'pinia'
import deepmerge from 'deepmerge'

/* ===== ACTIONS ===== */
import { fetchOrders } from './actions/fetchOrders'

export const useOrdersStore = defineStore('orders', {
  state: () => {
    return {
      loadingOrders: false,
      orders: [],
      pushSettings: [],
      searchString: null,
      sortOptions: [
        { icon: 'pi pi-sort-alpha-up', key: 'store_domain', label: 'Date: New to Old', sortByDesc: false },
        { icon: 'pi pi-sort-alpha-up-alt', key: 'store_domain', label: 'Date: Old to New', sortByDesc: true }
      ]
    }
  },

  getters: {
  },

  actions: deepmerge.all([
    fetchOrders
  ]),
})
