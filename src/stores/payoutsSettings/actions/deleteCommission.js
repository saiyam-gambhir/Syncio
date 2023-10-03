import { useConnectionsStore } from 'connections';

export const deleteCommission = {
  async deleteCommission(commissionId) {
    const { data: { success } } = await this.$https.delete(`stores/commission-rate/${commissionId}`);
    if(success) {
      switch (this.activeTabIndex) {
        case 1:
          const connections = useConnectionsStore();
          await connections.fetchConnections();
          break;
        case 2:
          await this.fetchByProduct();
          break;
      }
    }
  }
};
