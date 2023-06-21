export const deleteConnection = {
  async deleteConnection(connectionId, keepingProducts = true) {
    const response = await this.$https.post('stores/disconnect', {
      connection_id: connectionId,
      keeping_products: keepingProducts,
    });

    await this.fetchConnections();
  },
};
