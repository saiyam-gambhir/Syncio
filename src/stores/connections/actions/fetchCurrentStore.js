import router from '@/router';

export const fetchCurrentStore = {
  async fetchCurrentStore() {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);

    const response = await axiosService.getData('stores');

    if(response?.stores?.length === 2) {
      this.universalStores = await response.stores;
      if(urlParams.has('store_id')) {
        this.currentStore = this.universalStores.find(store => +store.id === +urlParams.get('store_id'));
      } else if(!this.currentStore && !this.universalStores[0].default && !this.universalStores[1].default) {
        this.currentStore = await this.universalStores[0];
      } else {
        this.currentStore = this.universalStores.find(store => store.default);
      }
    } else if (response?.success) {
      this.universalStores = [];
      this.currentStore = await response.stores?.[0] || null;
    }

    if(this.currentStore) {
      Boolean(+this.currentStore.is_multi_locations) ? (this.isMultilocationEnabled = 'On') : (this.isMultilocationEnabled = 'Off');
    }

    return response;
  }
};
