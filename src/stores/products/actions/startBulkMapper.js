export const startBulkMapper = {
  async startBulkMapper() {
    const { storeId } = useConnectionsStore();

    const params = {
      destination_store_id: storeId,
      source_store_id: this.selectedStore[0].id,
    };

    this.loadingBulkMapper = true;
    const response = await axiosService.getData('products/bulk-smart-mapping', params, this.loadingBulkMapper);

    if(response.success) {
      this.isBulkMapperDialogRequested = false;
      this.loadingBulkMapper = false;
    }
  }
};
