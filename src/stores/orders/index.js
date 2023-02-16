import { defineStore } from 'pinia'
import deepmerge from 'deepmerge'

/* ===== ACTIONS ===== */
import { fetchOrder } from './actions/fetchOrder'
import { fetchOrders } from './actions/fetchOrders'

export const useOrdersStore = defineStore('orders', {
  state: () => {
    return {
      isViewOrderDetailsRequested: false,
      loadingOrder: false,
      loadingOrders: false,
      order: null,
      orders: [],
      params: { page: '1', searchString: null, sortBy: 'DESC' },
      pushSettings: [],
      sortOptions: [
        { icon: 'pi pi-sort-alpha-up', key: 'store_domain', label: 'Date: New to Old', sortByDesc: false },
        { icon: 'pi pi-sort-alpha-up-alt', key: 'store_domain', label: 'Date: Old to New', sortByDesc: true }
      ]
    }
  },

  actions: deepmerge.all([
    fetchOrder,
    fetchOrders,
  ]),
})
