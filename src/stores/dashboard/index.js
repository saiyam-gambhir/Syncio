import { defineStore } from 'pinia'
import deepmerge from 'deepmerge'

/* ===== ACTIONS ===== */
import { fetchDashboard } from './actions/fetchDashboard'
import { updateDashboard } from './actions/updateDashboard'

export const useDashboardStore = defineStore('dashboard', {
  state: () => {
    return {
      loading: false,
      selectedSections: []
    }
  },

  actions: deepmerge.all([
    fetchDashboard,
    updateDashboard
  ]),
})
