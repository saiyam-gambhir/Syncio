import deepmerge from 'deepmerge';

/* ----- Actions ----- */
import { bulkPushOrders } from './actions/bulkPushOrders';
import { fetchOrder } from './actions/fetchOrder';
import { fetchOrders } from './actions/fetchOrders';
import { fetchPushSettings } from './actions/fetchPushSettings';
import { pushOrder } from './actions/pushOrder';
import { toggleAutoPush } from './actions/toggleAutoPush';
import { updatePushSettings } from './actions/updatePushSettings';

export const useOrdersStore = defineStore('orders', {
  state: () => {
    return {
      activeTabIndex: 0,
      bulkPushCount: null,
      bulkPushShippingCost: null,
      filters: { searchStr: '', sortBy: 'DESC' },
      isAutoPushEnabled: 'Off',
      isBulkPushActive: false,
      isBulkPushDialogVisible: false,
      isEnableAutoPushRequested: false,
      isViewOrderDetailsRequested: false,
      isPushOrderEmailSettingsChanged: false,
      isPushOrderShippingRulesChanged: false,
      isPushOrderShippingTagsChanged: false,
      loadingMoreOrders: false,
      loadingOrder: false,
      loadingOrders: false,
      loadingSettings: false,
      order: {},
      orders: [],
      ordersCollection: [],
      pagination: {},
      pushOrderEmailSettings: null,
      pushOrderShippingRules: null,
      pushOrderShippingTags: null,
      pushSettings: [],
      selectedEmailContact: '',
      selectedOrders: [],
      shippingTags: [],
      stringifyPushOrderEmailSettings: null,
      stringifyPushOrderShippingRules: null,
      stringifyPushOrderShippingTags: null,
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
    updatePushSettings,
  ]),

  persist: {
    enabled: true,
    strategies: [
      {
        key: 'orders',
        storage: sessionStorage,
        paths: [
          'activeTabIndex',
          'filters',
          'selectedOrders',
        ],
      },
    ],
  },
});
