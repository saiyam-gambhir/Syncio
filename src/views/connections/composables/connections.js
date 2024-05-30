export function useConnections() {
  const {
    connectPartnerStore,
    fetchConnections,
    invitePartnerStore,
    isConnectionDisconnectRequested,
    isNewStoreConnectionRequested,
    selectedConnection,
    updateLocation,
  } = toRefs(useConnectionsStore());

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

  const connectPartnerStoreHandler = async (storeIdentifier) => {
    try {
      isSendingInvitation.value = true;
      const response = await connectPartnerStore.value(storeIdentifier);
      isNewStoreConnectionRequested.value = false;
      return response;
    } catch(error) {
      throw new Error(error);
    } finally {
      isSendingInvitation.value = false;
    }
  };

  const invitePartnerStoreHandler = async (partnerStoreEmail) => {
    try {
      isSendingInvitation.value = true;
      const response = await invitePartnerStore.value(partnerStoreEmail);
      isNewStoreConnectionRequested.value = false;
      return response;
    } catch(error) {
      throw new Error(error);
    } finally {
      isSendingInvitation.value = false;
    }
  };

  const updateLocationHandler = () => {
    updateLocation.value();
  };

  return {
    connectPartnerStoreHandler,
    fetchConnectionsHandler,
    getStoreStatus,
    invitePartnerStoreHandler,
    isSendingInvitation,
    updateLocationHandler,
    showDisconnectStoreDialog,
  };
}
