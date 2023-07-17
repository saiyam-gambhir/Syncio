import { defineStore } from 'pinia';
import { useToast } from 'primevue/usetoast';
import deepmerge from 'deepmerge';

/* ----- Actions ----- */
import { connectPartnerStore } from './actions/connectPartnerStore';
import { deleteConnection } from './actions/deleteConnection';
import { fetchConnections } from './actions/fetchConnections';
import { fetchCurrentStore } from './actions/fetchCurrentStore';
import { fetchDestinationLocations } from './actions/fetchDestinationLocations';
import { invitePartnerStore } from './actions/invitePartnerStore';
import { showToast } from './actions/showToast';
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
      isNewStoreConnectionRequested: false,
      isDisableMultilocationRequested: false,
      isDisconnectAndDeleteRequested: false,
      isDisconnectAndKeepRequested: false,
      isMultilocationEnabled: 'Off',
      loadingConnections: false,
      loadingLocationChange: false,
      selectedConnection: {},
      toast: useToast(),
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
    platform({ currentStore }) {
      return currentStore?.platform;
    },

    storeCreationDate({ currentStore }) {
      return currentStore?.created_at;
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
    connectPartnerStore,
    deleteConnection,
    fetchConnections,
    fetchCurrentStore,
    fetchDestinationLocations,
    invitePartnerStore,
    showToast,
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
