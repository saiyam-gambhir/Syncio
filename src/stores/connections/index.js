import deepmerge from 'deepmerge';

/* ----- Actions ----- */
import { connectPartnerStore } from './actions/connectPartnerStore';
import { deleteConnection } from './actions/deleteConnection';
import { fetchConnections } from './actions/fetchConnections';
import { fetchCurrentStore } from './actions/fetchCurrentStore';
import { fetchDestinationLocations } from './actions/fetchDestinationLocations';
import { fetchMetadata } from './actions/fetchMetadata';
import { fetchSourceLocations } from './actions/fetchSourceLocations';
import { invitePartnerStore } from './actions/invitePartnerStore';
import { toggleMultilocation } from './actions/toggleMultilocation';
import { updateLocation } from './actions/updateLocation';
import { updateEmail } from './actions/updateEmail';

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
      isConnectViaStoreKeyRequested: false,
      isDisableMultilocationRequested: false,
      isDisconnectAndDeleteRequested: false,
      isDisconnectAndKeepRequested: false,
      isInviteViaEmailRequested: false,
      isLocationChanged: false,
      isLocationChangeRequested: false,
      isLocationPendingDialogRequested: false,
      isMultilocationEnabled: 'Off',
      isNewStoreConnectionRequested: false,
      loadingConnections: false,
      loadingEmail: false,
      loadingInventory: false,
      loadingLocationChange: false,
      loadingTestStoreConnection: false,
      location: { current: null, new: null, params: null, store: null },
      selectedConnection: {},
      shopifyPermissions: { link: null, showDialog: false },
      sortOptions: [
        { key: 'store_domain', label: 'A-Z', sortByDesc: false },
        { key: 'store_domain', label: 'Z-A', sortByDesc: true },
      ],
      sourceLocations: null,
    };
  },

  getters: {
    platform({ currentStore }) {
      return currentStore?.platform;
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
  },

  actions: deepmerge.all([
    connectPartnerStore,
    deleteConnection,
    fetchConnections,
    fetchCurrentStore,
    fetchDestinationLocations,
    fetchMetadata,
    fetchSourceLocations,
    invitePartnerStore,
    toggleMultilocation,
    updateLocation,
    updateEmail,
  ]),

  persist: {
    enabled: true,
    strategies: [
      {
        key: 'connections',
        storage: sessionStorage,
        paths: [
          'connectionFilterItems',
          'currentStore',
          'filters',
          'selectedConnection',
        ],
      },
    ],
  },
});
