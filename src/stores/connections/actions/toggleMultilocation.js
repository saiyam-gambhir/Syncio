export const toggleMultilocation = {
  async toggleMultilocation() {
    let toggleValue = this.isMultilocationEnabled === 'On' ? true : false
    this.loadingConnections = true
    const response = await this.$https.post(`stores/${this.storeId}/multi-locations/toggle`, {
      value: toggleValue
    })
    await this.fetchConnections()
  }
}
