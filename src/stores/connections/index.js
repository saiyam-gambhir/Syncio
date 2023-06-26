import { defineStore } from 'pinia';
import deepmerge from 'deepmerge';

/* ----- Actions ----- */
import { deleteConnection } from './actions/deleteConnection';
import { fetchConnections } from './actions/fetchConnections';
import { fetchCurrentStore } from './actions/fetchCurrentStore';
import { fetchDestinationLocations } from './actions/fetchDestinationLocations';
import { toggleMultilocation } from './actions/toggleMultilocation';
import { updateLocation } from './actions/updateLocation';

export const useConnectionsStore = defineStore('connections', {
  state: () => {
    return {
      connections: [],
      currentStore: null,
      destinationLocations: null,
      filters: {
        searchString: null,
        sortBy: null,
      },
      currentLocation: {},
      isConnectionDisconnectRequested: false,
      isConnectNewStoreRequested: false,
      isDisableMultilocationRequested: false,
      isDisconnectAndDeleteRequested: false,
      isDisconnectAndKeepRequested: false,
      isLocationChangeConfirmationVisible: false,
      isLocationChangeRequested: false,
      isMultilocationEnabled: 'Off',
      loadingConnections: false,
      loadingLocationChange: false,
      selectedConnection: {},
      selectedLocation: {},
      sortOptions: [
        {
          icon: 'pi pi-sort-alpha-up',
          key: 'store_domain',
          label: 'A-Z',
          sortByDesc: false,
        },
        {
          icon: 'pi pi-sort-alpha-up-alt',
          key: 'store_domain',
          label: 'Z-A',
          sortByDesc: true,
        },
      ],
    };
  },

  getters: {
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

    isConnectionStatusPending(state) {
      return state.connections.some(connection => {
        return connection.status === 'pending';
      });
    },

    isMultilocation({ isMultilocationEnabled }) {
      return isMultilocationEnabled === 'On';
    },

    isStoreMultilocation({ currentStore }) {
      return Boolean(+currentStore?.is_multi_locations);
    },

    isDestinationStore() {
      return this.storeType === 'destination';
    },

    isSourceStore() {
      return this.storeType === 'source';
    },
  },

  actions: deepmerge.all([
    deleteConnection,
    fetchConnections,
    fetchCurrentStore,
    fetchDestinationLocations,
    toggleMultilocation,
    updateLocation,
  ]),

  persist: {
    enabled: true,
    strategies: [
      {
        key: 'connections',
        storage: sessionStorage,
        paths: [
          'currentStore',
          'filters',
          'isConnectionDisconnectRequested',
          'selectedConnection',
        ],
      },
    ],
  },
});
