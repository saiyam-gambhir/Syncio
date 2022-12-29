export const fetchConnections = {
  async fetchConnections(payload) {
    const response = await this.$https('stores/connections', {
      params: {
        ...payload
      }
    })
  }
}
