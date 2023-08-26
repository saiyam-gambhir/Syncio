import { useConnectionsStore } from 'connections';

export function useConnections() {
  const {
    connectPartnerStore,
    fetchConnections,
    invitePartnerStore,
    isConnectionDisconnectRequested,
    isNewStoreConnectionRequested,
    selectedConnection,
  } = toRefs(useConnectionsStore());

  const isConnectViaStoreKeyRequested = ref(false);
  const isInviteViaEmailRequested = ref(false);
  const isSendingInvitation = ref(false);

  const fetchConnectionsHandler = async () => {
    await fetchConnections.value();
  };

  const getStoreStatus = status => {
    return status === 'active' ? 'success' : 'danger';
  };

  const showDisconnectStoreDialog = connection => {
    selectedConnection.value = connection;
    isConnectionDisconnectRequested.value = true;
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

  const connectPartnerStoreHandler = async (storeIdentifier) => {
    try {
      isSendingInvitation.value = true;
      await connectPartnerStore.value(storeIdentifier);
      isNewStoreConnectionRequested.value = false;
    } catch(error) {
      throw new Error(error);
    } finally {
      isSendingInvitation.value = false;
    }
  }

  const invitePartnerStoreHandler = async (partnerStoreEmail) => {
    try {
      isSendingInvitation.value = true;
      await invitePartnerStore.value(partnerStoreEmail);
      isNewStoreConnectionRequested.value = false;
    } catch(error) {
      throw new Error(error);
    } finally {
      isSendingInvitation.value = false;
    }
  }

  return {
    connectPartnerStoreHandler,
    fetchConnectionsHandler,
    getStoreStatus,
    invitePartnerStoreHandler,
    isConnectViaStoreKeyRequested,
    isInviteViaEmailRequested,
    isSendingInvitation,
    showDisconnectStoreDialog,
  };
}
