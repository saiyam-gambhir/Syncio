export const fetchCurrentStore = {
  async fetchCurrentStore() {
    const response = await axiosService.getData('stores');
    if(response?.success) {
      this.currentStore = await response?.stores[0];
    }
    if(this.currentStore) {
      Boolean(+this.currentStore.is_multi_locations) ? (this.isMultilocationEnabled = 'On') : (this.isMultilocationEnabled = 'Off');
    }

    return response;
  }
}
