import deepmerge from 'deepmerge';

/* ----- Actions ----- */
import { fetchDashboardStats } from './actions/fetchDashboardStats';

export const useDashboardStore = defineStore('Dashboard', {
  state: () => {
    return {
      loading: false,
      stats: {}
    }
  },

  actions: deepmerge.all([
    fetchDashboardStats,
  ]),

  persist: {
    enabled: true,
    strategies: [
      {
        key: 'dashboard',
        storage: sessionStorage,
        paths: [
          'stats',
        ],
      },
    ],
  },
});
