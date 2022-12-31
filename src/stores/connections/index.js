import { defineStore } from 'pinia'
import deepmerge from 'deepmerge'

/* ===== ACTIONS ===== */
import { fetchConnections } from './actions/fetchConnections'
import { fetchCurrentStore } from './actions/fetchCurrentStore'
import { fetchDestinationLocations } from './actions/fetchDestinationLocations'

export const useConnectionsStore = defineStore('connections', {
  state: () => {
    return {
      connections: [],
      currentStore: null,
      destinationLocations: null,
      isConnectionDisconnectRequested: false,
      isDisconnectAndDeleteRequested: false,
      isDisconnectAndKeepRequested: false,
      selectedConnection: null,
    }
  },

  getters: {
    storeId(state) {
      return state.currentStore?.id
    },

    storeKey(state) {
      return state.currentStore?.identifier
    },

    storeType(state) {
      return state.currentStore?.type
    }
  },

  actions: deepmerge.all([
    fetchConnections,
    fetchCurrentStore,
    fetchDestinationLocations,
  ]),
})
