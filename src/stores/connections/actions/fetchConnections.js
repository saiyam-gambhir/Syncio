export const fetchConnections = {
  async fetchConnections(payload) {
    const response = await this.$https('stores/connections', {
      params: {
        current_store_id: this.storeId
      }
    })

    this.connections = await response.data?.stores
    await this.fetchDestinationLocations()
  }
}
