import deepmerge from 'deepmerge';

/* ----- Actions ----- */
import { fetchStats } from './actions/fetchStats';

export const useDashboardStore = defineStore('Dashboard', {
  state: () => {
    return {
      loading: false,
      stats: {}
    }
  },

  actions: deepmerge.all([
    fetchStats,
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
