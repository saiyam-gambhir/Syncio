export const fetchConnections = {
  async fetchConnections() {
    const { searchString, sortBy } = this.filters
    this.loadingConnections = true

    const response = await this.$https('stores/connections', {
      params: {
        current_store_id: this.storeId,
        search_str: searchString,
        sort_by_desc: sortBy?.sortByDesc,
        sort_by: sortBy?.key,
      }
    })

    this.connections = await response.data?.stores
    this.loadingConnections = false
  }
}
