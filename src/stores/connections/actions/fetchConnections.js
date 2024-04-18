export const fetchConnections = {
  async fetchConnections(reloadConnections = false) {
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
    if(this.connectionFilterItems?.length === 0 || reloadConnections) {
      this.connectionFilterItems = JSON.parse(JSON.stringify(storeConnections.value));
      this.connectionFilterItems.forEach(connection => {
        if(!connection.store_name) {
          connection.store_name = connection.store_domain;
        }
      });
    }
    this.loadingConnections = false;
  },
};
