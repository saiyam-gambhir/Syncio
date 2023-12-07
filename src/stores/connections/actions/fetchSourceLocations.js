export const fetchSourceLocations = {
  async fetchSourceLocations() {
    this.loadingInventory = true;
    const response = await axiosService.getData(`stores/${this.storeId}/inventory-assignments`);

    if(response.success) {
      this.sourceLocations = await response.inventories;
      this.loadingInventory = false;
    }
  }
};
