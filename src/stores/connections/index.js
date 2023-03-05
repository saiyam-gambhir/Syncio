import { defineStore } from 'pinia'
import deepmerge from 'deepmerge'

/* ===== ACTIONS ===== */
import { deleteConnection } from './actions/deleteConnection'
import { fetchConnections } from './actions/fetchConnections'
import { fetchCurrentStore } from './actions/fetchCurrentStore'
import { fetchDestinationLocations } from './actions/fetchDestinationLocations'
import { toggleMultilocation } from './actions/toggleMultilocation'

export const useConnectionsStore = defineStore('connections', {
  state: () => {
    return {
      connections: [],
      currentStore: null,
      destinationLocations: null,
      filters: { searchString: null, sortBy: null },
      isConnectionDisconnectRequested: false,
      isConnectNewStoreRequested: false,
      isDisableMultilocationRequested: false,
      isDisconnectAndDeleteRequested: false,
      isDisconnectAndKeepRequested: false,
      isLocationChangeRequested: false,
      isMultilocationEnabled: 'Off',
      isSetCommissionRequested: false,
      loadingConnections: false,
      selectedConnection: {},
      sortOptions: [
        { icon: 'pi pi-sort-alpha-up', key: 'store_domain', label: 'A-Z', sortByDesc: false },
        { icon: 'pi pi-sort-alpha-up-alt', key: 'store_domain', label: 'Z-A', sortByDesc: true }
      ]
    }
  },

  getters: {
    storeId(state) {
      return state.currentStore?.id
    },

    storeKey(state) {
      return state.currentStore?.identifier
    },

    storeName(state) {
      return state.currentStore?.store_domain
    },

    storeType(state) {
      return state.currentStore?.type
    },

    isConnectionStatusPending(state) {
      return state.connections.some(connection => {
        return connection.status === 'pending'
      })
    },

    isMultilocation(state) {
      return state.isMultilocationEnabled === 'On'
    },

    isStoreMultilocation(state) {
      return Boolean(+state.currentStore?.is_multi_locations)
    }
  },

  actions: deepmerge.all([
    deleteConnection,
    fetchConnections,
    fetchCurrentStore,
    fetchDestinationLocations,
    toggleMultilocation,
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
        ]
      }
    ]
  }
})
