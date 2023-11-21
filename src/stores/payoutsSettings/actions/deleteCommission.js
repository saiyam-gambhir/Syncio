import { useConnectionsStore } from 'connections';

export const deleteCommission = {
  async deleteCommission(commissionId) {
    const { success } = await axiosService.deleteData(`stores/commission-rate/${commissionId}`);
    if(success) {
      switch (this.activeTabIndex) {
        case 1:
          const connections = useConnectionsStore();
          await connections.fetchConnections();
          break;
        case 2:
          await this.fetchByProduct(this.storeProductsPagination?.current_page);
          break;
      }
    }
  }
};
