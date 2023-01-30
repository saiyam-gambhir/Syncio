import { defineStore } from 'pinia'
import deepmerge from 'deepmerge'

/* ===== ACTIONS ===== */
import { fetchActvities } from './actions/fetchActivities'

export const useActivityCenterStore = defineStore('activityCenter', {
  state: () => {
    return {
      activeTabIndex: 0,
      generalUpdates: null,
      loadingActivities: false,
      orderIssues: null,
      productIssues: null,
    }
  },

  getters: {
    activeTab({ activeTabIndex }) {
      if(activeTabIndex === 0) return 'product'
      else if(activeTabIndex === 1) return 'order'
      else if(activeTabIndex === 2) return 'general'
    }
  },

  actions: deepmerge.all([
    fetchActvities
  ]),
})
