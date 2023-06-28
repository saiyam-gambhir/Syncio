import { useConnectionsStore } from '@/stores/connections';

export function useConnections() {
  const connections = useConnectionsStore();

  const fetchConnectionsHandler = async () => {
    await connections.fetchConnections();
  };

  const getStoreStatus = status => {
    return status === 'active' ? 'success' : 'danger';
  };

  const showDisconnectStoreDialog = connection => {
    connections.selectedConnection = connection;
    connections.isConnectionDisconnectRequested = true;
  };

  // const locationChangeHandler = async () => {
  //   const payload = {
  //     d_inventory_reference:
  //       connections.selectedLocation?.external_reference_id,
  //     destination_store_id: connections.storeId,
  //     is_default: true,
  //     name: connections.selectedLocation.name,
  //     s_inventory_reference:
  //       connections.selectedConnection?.source_default_inventory_location,
  //     source_store_id: connections.selectedConnection?.id,
  //     store_type: connections.storeType,
  //     sync_option: 'keep',
  //   };

  //   connections.loadingLocationChange = true;
  //   await connections.updateLocation(payload);
  //   connections.loadingLocationChange = false;
  //   isLocationChanged.value = true;
  // };

  return {
    connections,
    fetchConnectionsHandler,
    getStoreStatus,
    showDisconnectStoreDialog,
  };
}
