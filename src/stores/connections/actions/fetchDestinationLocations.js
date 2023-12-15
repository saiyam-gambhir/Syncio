export const fetchDestinationLocations = {
  async fetchDestinationLocations() {
    this.loadingInventory = true;
    const response = await axiosService.getData(`stores/${this.storeId}/destination-locations`);

    if(response?.success) {
      this.destinationLocations = await response.inventories;
    }

    this.loadingInventory = false;
  }
};
