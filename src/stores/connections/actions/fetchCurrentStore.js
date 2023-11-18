import axiosService from '@/composables/axios';

export const fetchCurrentStore = {
  async fetchCurrentStore() {
    const { stores } = await axiosService.getData('stores');
    this.currentStore = await stores[0];
    if(this.currentStore) {
      Boolean(+this.currentStore.is_multi_locations) ? (this.isMultilocationEnabled = 'On') : (this.isMultilocationEnabled = 'Off');
    }
  }
}
