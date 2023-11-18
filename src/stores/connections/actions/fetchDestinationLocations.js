import axiosService from '@/composables/axios';

export const fetchDestinationLocations = {
  async fetchDestinationLocations() {
    const { inventories } = await axiosService.getData(`stores/${this.storeId}/destination-locations`);
    this.destinationLocations = await inventories;
  }
}
