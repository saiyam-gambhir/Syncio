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
    return {
      bulkPushCount: null,
      bulkPushShippingCost: null,
      filters: { searchStr: '', sortBy: 'DESC' },
      isAutoPushEnabled: 'Off',
      isBulkPushActive: false,
      isEnableAutoPushRequested: false,
      isViewOrderDetailsRequested: false,
      loadingMoreOrders: false,
      loadingOrder: false,
      loadingOrders: false,
      order: {},
      orders: [],
      ordersCollection: [],
      pagination: {},
      pushSettings: [],
      selectedOrders: [],
      sortOptions: [
        {
          icon: 'pi pi-sort-numeric-up-alt',
          label: 'Date: Newest first',
          sortBy: 'DESC',
        },
        {
          icon: 'pi pi-sort-numeric-up',
          label: 'Date: Oldest first',
          sortBy: 'ASC',
        },
      ],
    };
  },

  getters: {
    autoPushStatus(state) {
      const autoPushSetting = state.pushSettings.find(setting => setting.key === 'auto_push_order');
      return autoPushSetting?.value;
    },

    storeId() {
      const { storeId } = useConnectionsStore();
      return storeId;
    }
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
        paths: [
          'filters',
          'isViewOrderDetailsRequested',
          'order',
          'selectedOrders',
        ],
      },
    ],
  },
});
