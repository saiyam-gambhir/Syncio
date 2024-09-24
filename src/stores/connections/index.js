import { DateTime } from 'luxon';
import deepmerge from 'deepmerge';

/* ----- Actions ----- */
import { connectPartnerStore } from './actions/connectPartnerStore';
import { deleteStore } from './actions/deleteStore';
import { deleteConnection } from './actions/deleteConnection';
import { enableStore } from './actions/enableStore';
import { fetchConnections } from './actions/fetchConnections';
import { fetchCurrentStore } from './actions/fetchCurrentStore';
import { fetchDestinationLocations } from './actions/fetchDestinationLocations';
import { fetchMetadata } from './actions/fetchMetadata';
import { fetchSourceLocations } from './actions/fetchSourceLocations';
import { fetchStoreStats } from './actions/fetchStoreStats';
import { invitePartnerStore } from './actions/invitePartnerStore';
import { toggleMultilocation } from './actions/toggleMultilocation';
import { uninstallStore } from './actions/uninstallStore';
import { updateDefaultStore } from './actions/updateDefaultStore';
import { updateAPIKey } from './actions/updateAPIKey';
import { updateEmail } from './actions/updateEmail';
import { updateLocation } from './actions/updateLocation';

export const useConnectionsStore = defineStore('connections', {
  state: () => {
    return {
      clickedStore: null,
      connectionFilterItems: [],
      connections: [],
      currentLocation: {},
      currentStore: null,
      destinationLocations: null,
      filters: { searchString: null, sortBy: null },
      isConnectionDisconnectRequested: false,
      isConnectionSettingsDialogRequested: false,
      isConnectViaStoreKeyRequested: false,
      isDeactivateStoreDialogVisible: false,
      isDisableMultilocationRequested: false,
      isDisconnectAndDeleteRequested: false,
      isDisconnectAndKeepRequested: false,
      isEnableUniversalStoreRequested: false,
      isInvalidKey: false,
      isInviteViaEmailRequested: false,
      isLocationChanged: false,
      isLocationChangeRequested: false,
      isLocationPendingDialogRequested: false,
      isMultilocationEnabled: 'Off',
      isNewStoreConnectionRequested: false,
      isStoreDeactivated: false,
      isUninstallDialogVisible: false,
      isUpdateAPIKeyDialogVisible: false,
      isUpdateAPISuccess: false,
      loadingAPIKeyUpdate: false,
      loadingConnections: false,
      loadingDefaultStoreUpdate: false,
      loadingEmail: false,
      loadingEnableStore: false,
      loadingInventory: false,
      loadingLocationChange: false,
      loadingStats: false,
      loadingTestStoreConnection: false,
      loadingUninstall: false,
      location: { current: null, new: null, params: null, store: null },
      selectedConnection: {},
      shopifyPermissions: { link: null, showDialog: false },
      sortOptions: [
        { key: 'store_name', label: 'A-Z', sortByDesc: false },
        { key: 'store_name', label: 'Z-A', sortByDesc: true },
      ],
      sourceLocations: null,
      universalStores: [],
      wooApiKeyStoreId: null,
      sourceStorePricingReleaseDate: '2024-08-13T00:00:00.000000Z',
    };
  },

  getters: {
    customStoreName({ currentStore }) {
      return currentStore?.store_name;
    },

    platform({ currentStore }) {
      return currentStore?.platform;
    },

    isDefaultStore({ currentStore }) {
      return currentStore?.default;
    },

    isShopify() {
      return this.platform?.toLowerCase() === 'shopify';
    },

    isWoocommerce() {
      return this.platform?.toLowerCase() === 'woocommerce';
    },

    isShopline() {
      return this.platform?.toLowerCase() === 'shopline';
    },

    storeCreationDate({ currentStore }) {
      return currentStore?.created_at;
    },

    storeDefaultCommission({ currentStore }) {
      return currentStore?.default_commission_rate;
    },

    storeId({ currentStore }) {
      return currentStore?.id;
    },

    storeKey({ currentStore }) {
      return currentStore?.identifier;
    },

    storeName({ currentStore }) {
      return currentStore?.store_domain;
    },

    storeType({ currentStore }) {
      return currentStore?.type;
    },

    partnerStoreType() {
      return this.storeType === 'destination' ? 'Source store' : 'Destination store';
    },

    isConnectionStatusPending(state) {
      return state.connections?.some(connection => connection.status.toLowerCase() === 'pending');
    },

    isMultilocation({ isMultilocationEnabled }) {
      return isMultilocationEnabled === 'On';
    },

    isStoreMultilocation({ currentStore }) {
      return Boolean(+currentStore?.is_multi_locations);
    },

    isDestinationStore() {
      return this.storeType?.toLowerCase() === 'destination';
    },

    isSourceStore() {
      return this.storeType?.toLowerCase() === 'source';
    },

    isUniversalStore({ universalStores }) {
      return universalStores.length === 2 && ((universalStores[0].type === 'destination' && universalStores[1].type === 'source') || (universalStores[0].type === 'source' && universalStores[1].type === 'destination'));
    },

    requiresSourceStorePlanApproval({ currentStore }) {
      return DateTime.fromISO(currentStore?.created_at) > DateTime.fromISO(this.sourceStorePricingReleaseDate);
    },

    /**
     * 1. If `isSourceStore` is true:
     *    - Return true if `isUniversalStore` is also true, OR
     *    - If the store is `isShopify` and `requiresSourceStorePlanApproval` is true.
     *
     * 2. If `isSourceStore` is not true, return true if:
     *    - The store is a `isShopify` store and is a `isDestinationStore`.
    */
    showUniversalStoreControls() {
      return (this.isSourceStore) && (this.isUniversalStore || (this.isShopify && this.requiresSourceStorePlanApproval)) || (this.isShopify && this.isDestinationStore);
    },
  },

  actions: deepmerge.all([
    connectPartnerStore,
    deleteStore,
    deleteConnection,
    enableStore,
    fetchConnections,
    fetchCurrentStore,
    fetchDestinationLocations,
    fetchMetadata,
    fetchSourceLocations,
    fetchStoreStats,
    invitePartnerStore,
    toggleMultilocation,
    uninstallStore,
    updateDefaultStore,
    updateAPIKey,
    updateEmail,
    updateLocation,
  ]),

  persist: {
    enabled: true,
    strategies: [
      {
        key: 'connections',
        storage: sessionStorage,
        paths: [
          'connectionFilterItems',
          // 'currentStore',
          'filters',
          'selectedConnection',
        ],
      },
    ],
  },
});
