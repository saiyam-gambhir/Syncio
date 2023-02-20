import { defineStore } from 'pinia'
import deepmerge from 'deepmerge'

/* ===== ACTIONS ===== */
import { fetchOrder } from './actions/fetchOrder'
import { fetchOrders } from './actions/fetchOrders'
import { fetchPushSettings } from './actions/fetchPushSettings'
import { toggleAutoPush } from './actions/toggleAutoPush'

export const useOrdersStore = defineStore('orders', {
  state: () => {
    return {
      isAutoPushEnabled: 'Off',
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

  getters: {
    autoPushStatus(state) {
      const autoPushSetting = state.pushSettings.find(setting => setting.key === 'auto_push_order')
      return autoPushSetting?.value
    }
  },

  actions: deepmerge.all([
    fetchOrder,
    fetchOrders,
    fetchPushSettings,
    toggleAutoPush,
  ]),
})
