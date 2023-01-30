export const fetchConnections = {
  async fetchConnections(payload) {
    const { searchString, sortBy, sortByDesc } = this.filters
    this.loadingConnections = true

    const response = await this.$https('stores/connections', {
      params: {
        current_store_id: this.storeId,
        search_str: searchString,
        sort_by_desc: sortByDesc,
        sort_by: sortBy,
      }
    })

    this.connections = await response.data?.stores
    this.loadingConnections = false
  }
}
