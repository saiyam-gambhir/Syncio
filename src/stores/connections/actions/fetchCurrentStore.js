export const fetchCurrentStore = {
  async fetchCurrentStore(payload) {
    const response = await this.$https('stores')
    this.currentStore = await response.data?.stores[0]
  }
}
