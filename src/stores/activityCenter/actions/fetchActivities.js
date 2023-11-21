/**
 * Fetches activities based on the active tab and associated queries.
 * Applies filtering to remove unwanted queries before making the API request.
 */

import { useAuthStore } from 'auth';
import { useFilters } from '@/composables/filters';

export const fetchActivities = {
  async fetchActivities(page) {
    try {
      // Set the loading flag to true to indicate that activities are being fetched
      this.loadingActivities = true;

      // Get the userId from the authentication store
      const { userId } = useAuthStore();

      // Get the filterUnwantedQueries function from the filters composable
      const { filterUnwantedQueries } = useFilters();

      // Retrieve the active tab and associated queries from the tabDataMap
      const { activeTab } = this;
      const tabDataMap = {
        product: { tab: 'productIssues', queries: { ...this.productQueries } },
        order: { tab: 'orderIssues', queries: { ...this.orderQueries } },
        general: { tab: 'generalUpdates', queries: { ...this.generalQueries } },
      };
      const { tab, queries } = tabDataMap[activeTab];

      // Remove unwanted queries using the filterUnwantedQueries function
      filterUnwantedQueries(queries, 'all_events');

      // Create params and make the API request to fetch activities
      const params = {
        ...queries,
        group: activeTab,
        limiter: 25,
        page: page ?? null,
      };

      const response = await axiosService.getData(`user/${userId}/sync-events`, params);

      // Store the fetched activities in the appropriate tab
      this[tab] = await response.data;
    } catch (error) {
      console.error('Error fetching activities:', error);
    } finally {
      // Set the loading flag to false to indicate that activities have been fetched or an error occurred
      this.loadingActivities = false;
    }
  },
};
