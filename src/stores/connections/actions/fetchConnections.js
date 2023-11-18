import { usePayoutsSettingsStore } from 'payoutsSettings';
import axiosService from '@/composables/axios';

export const fetchConnections = {
  async fetchConnections() {
    const { searchString, sortBy } = this.filters;
    this.loadingConnections = true;

    const params = {
      current_store_id: this.storeId,
      search_str: searchString,
      sort_by_desc: sortBy?.sortByDesc,
      sort_by: sortBy?.key,
    };

    const { stores } = await axiosService.getData('stores/connections', params);

    this.connections = await stores;

    const { storeConnections } = toRefs(usePayoutsSettingsStore());
    storeConnections.value = await stores;

    this.connectionFilterItems = await stores;

    this.loadingConnections = false;
  },
};
