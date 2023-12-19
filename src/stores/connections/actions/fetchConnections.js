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

    const response = await axiosService.getData('stores/connections', params);
    this.connections = await response?.stores;

    /* ----- Payouts settings ----- */
    const { storeConnections } = toRefs(usePayoutsSettingsStore());
    storeConnections.value = await response?.stores;

    /* ----- Stores dropdown filter ----- */
    this.connectionFilterItems = await response?.stores;
    this.loadingConnections = false;
  },
};
