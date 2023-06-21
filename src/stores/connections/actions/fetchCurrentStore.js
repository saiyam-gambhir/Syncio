export const fetchCurrentStore = {
  async fetchCurrentStore(payload) {
    const response = await this.$https('stores');
    this.currentStore = await response.data?.stores[0];
    Boolean(+this.currentStore.is_multi_locations)
      ? (this.isMultilocationEnabled = 'On')
      : (this.isMultilocationEnabled = 'Off');
  },
};
