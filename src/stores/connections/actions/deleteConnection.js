export const deleteConnection = {
  async deleteConnection(connectionId, keepingProducts, zeroInventory = true) {
    const params = {
      connection_id: connectionId,
      keeping_products: keepingProducts,
      zero_inventory: zeroInventory,
    };

    const response = await axiosService.postData('stores/disconnect', params);
    await this.fetchConnections(true);
  },
};
