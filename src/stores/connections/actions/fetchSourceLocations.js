export const fetchSourceLocations = {
  async fetchSourceLocations() {
    this.loadingInventory = true;
    const response = await axiosService.getData(`stores/${this.storeId}/inventory-assignments`);

    if(response?.success) {
      this.sourceLocations = await response.inventories;
      this.sourceLocations.unshift({ id: 0, name: 'All Locations' });
    }

    this.loadingInventory = false;
  }
};
