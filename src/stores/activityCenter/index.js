import { defineStore } from 'pinia'
import deepmerge from 'deepmerge'

/* ----- ACTIONS ----- */
import { deleteActivity } from './actions/deleteActivity'
import { fetchActivities } from './actions/fetchActivities'

export const useActivityCenterStore = defineStore('activityCenter', {
  state: () => {
    return {
      activeTabIndex: 0,
      generalQueries: { 'filters[event]': '', partner_store_id: '' },
      generalUpdates: null,
      loadingActivities: false,
      orderIssues: null,
      orderQueries: { 'filters[event]': '', partner_store_id: '', search_str: '' },
      productEvents: [
        { value: 'all_events', label: 'All Events (Default)' },
        { value: 'sku', label: 'SKU' },
        { value: 'mapping', label: 'Mapping' },
        { value: 'update', label: 'Update' },
        { value: 'product_import', label: 'Product Import' }
      ],
      productIssues: null,
      productQueries: { 'filters[event]': 'all_events', partner_store_id: '', search_str: '' },
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
    fetchActivities
  ]),

  // persist: {
  //   enabled: true,
  //   strategies: [
  //     {
  //       key: 'activityCenter',
  //       storage: sessionStorage,
  //       paths: [
  //         'productQueries',
  //       ]
  //     }
  //   ]
  // }
})
