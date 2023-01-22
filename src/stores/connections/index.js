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
      isConnectionDisconnectRequested: false,
      isDisableMultilocationRequested: false,
      isDisconnectAndDeleteRequested: false,
      isDisconnectAndKeepRequested: false,
      isLocationChangeRequested: false,
      isMultilocationEnabled: 'Off',
      isSetCommissionRequested: false,
      loadingConnections: false,
      selectedConnection: null,
    }
  },

  getters: {
    storeId(state) {
      return state.currentStore?.id
    },

    storeName(state) {
      return state.currentStore?.store_domain
    },

    storeKey(state) {
      return state.currentStore?.identifier
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
    }
  },

  actions: deepmerge.all([
    deleteConnection,
    fetchConnections,
    fetchCurrentStore,
    fetchDestinationLocations,
    toggleMultilocation,
  ]),
})
