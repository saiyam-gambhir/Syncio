export const fetchDestinationLocations = {
  async fetchDestinationLocations() {
    const response = await this.$https(`stores/${this.storeId}/destination-locations`)
    this.destinationLocations = await response.data?.inventories
  }
}
