import { defineStore } from 'pinia'
import deepmerge from 'deepmerge'

/* ===== ACTIONS ===== */
import { fetchConnections } from './actions/fetchConnections'
import { fetchCurrentStore } from './actions/fetchCurrentStore'

export const useConnectionsStore = defineStore('connections', {
  state: () => {
    return {
      connections: null,
      currentStore: null,
    }
  },

  getters: {
    currentStoreId(state) {
      return state.currentStore?.id
    }
  },

  actions: deepmerge.all([
    fetchConnections,
    fetchCurrentStore
  ]),
})
