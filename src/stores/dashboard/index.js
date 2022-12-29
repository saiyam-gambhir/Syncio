import { defineStore } from 'pinia'
import deepmerge from 'deepmerge'

/* ===== ACTIONS ===== */
import { fetchDashboard } from './actions/fetchDashboard'

export const useDashboardStore = defineStore('dashboard', {
  actions: deepmerge.all([
    fetchDashboard
  ]),
})
