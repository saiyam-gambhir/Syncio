export const fetchCurrentStore = {
  async fetchCurrentStore() {
    const response = await this.$https('stores');
    this.currentStore = await response.data?.stores[0];
    if(this.currentStore) {
      Boolean(+this.currentStore.is_multi_locations) ? (this.isMultilocationEnabled = 'On') : (this.isMultilocationEnabled = 'Off');
    }
  }
}
