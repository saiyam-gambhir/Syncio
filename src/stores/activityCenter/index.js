import { defineStore } from 'pinia'
import deepmerge from 'deepmerge'

/* ----- ACTIONS ----- */
import { deleteActivity } from './actions/deleteActivity'
import { fetchActvities } from './actions/fetchActivities'

export const useActivityCenterStore = defineStore('activityCenter', {
  state: () => {
    return {
      activeTabIndex: 0,
      generalUpdates: null,
      loadingActivities: false,
      orderIssues: null,
      productIssues: null,
      generalQueries: {},
      productQueries: {
        search_str: ''
      },
      orderQueries: {
        search_str: ''
      }
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
    deleteActivity,
    fetchActvities
  ]),

  persist: {
    enabled: true,
    strategies: [
      {
        key: 'activityCenter',
        storage: sessionStorage,
        paths: [
          'productQueries',
        ]
      }
    ]
  }
})
