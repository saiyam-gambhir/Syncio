export const fetchCurrentStore = {
  async fetchCurrentStore(payload) {
    const response = await this.$https('stores')
    this.currentStore = response.data?.stores[0]
  }
}
