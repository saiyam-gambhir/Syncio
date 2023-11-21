export const deleteConnection = {
  async deleteConnection(connectionId, keepingProducts = true) {
    const params = {
      connection_id: connectionId,
      keeping_products: keepingProducts,
    };

    const response = await axiosService.postData('stores/disconnect', params);
    await this.fetchConnections();
  },
};
