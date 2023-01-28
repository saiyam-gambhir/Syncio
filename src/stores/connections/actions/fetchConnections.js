export const fetchConnections = {
  async fetchConnections(payload) {
    const { searchString } = this.filters
    this.loadingConnections = true

    const response = await this.$https('stores/connections', {
      params: {
        current_store_id: this.storeId,
        search_str: searchString
      }
    })

    this.connections = await response.data?.stores
    this.loadingConnections = false
  }
}
