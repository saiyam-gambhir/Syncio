import { defineStore } from 'pinia';
import { useConnectionsStore } from '@/stores/connections';
import deepmerge from 'deepmerge';

/* ----- Actions ----- */
import { bulkPushOrders } from './actions/bulkPushOrders';
import { fetchOrder } from './actions/fetchOrder';
import { fetchOrders } from './actions/fetchOrders';
import { fetchPushSettings } from './actions/fetchPushSettings';
import { pushOrder } from './actions/pushOrder';
import { toggleAutoPush } from './actions/toggleAutoPush';

export const useOrdersStore = defineStore('orders', {
  state: () => {
    const { storeId } = useConnectionsStore();
    return {
      storeId: storeId,
      bulkPushCount: null,
      bulkPushShippingCost: null,
      isAutoPushEnabled: 'Off',
      isBulkPushActive: false,
      isViewOrderDetailsRequested: false,
      loadingOrder: false,
      loadingOrders: false,
      order: {},
      orders: [],
      ordersCollection: [],
      params: { page: '1', searchString: null, sortBy: 'DESC' },
      pushSettings: [],
      selectedOrders: [],
      sortOptions: [
        {
          icon: 'pi pi-sort-alpha-up',
          key: 'store_domain',
          label: 'Date: New to Old',
          sortByDesc: false,
        },
        {
          icon: 'pi pi-sort-alpha-up-alt',
          key: 'store_domain',
          label: 'Date: Old to New',
          sortByDesc: true,
        },
      ],
    };
  },

  getters: {
    autoPushStatus(state) {
      const autoPushSetting = state.pushSettings.find(setting => setting.key === 'auto_push_order');
      return autoPushSetting?.value;
    },
  },

  actions: deepmerge.all([
    bulkPushOrders,
    fetchOrder,
    fetchOrders,
    fetchPushSettings,
    pushOrder,
    toggleAutoPush,
  ]),

  persist: {
    enabled: true,
    strategies: [
      {
        key: 'orders',
        storage: sessionStorage,
        paths: ['isViewOrderDetailsRequested', 'order', 'selectedOrders'],
      },
    ],
  },
});
