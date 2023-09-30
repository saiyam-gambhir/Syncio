import { useConnectionsStore } from 'connections';

export const deleteStoreCommission = {
  async deleteStoreCommission(commissionId) {
    const { data: { success } } = await this.$https.delete(`stores/commission-rate/${commissionId}`);
    if(success) {
      const connections = useConnectionsStore();
      await connections.fetchConnections();
    }
  }
};
