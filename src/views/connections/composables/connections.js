import { useConnectionsStore } from '@/stores/connections'
import { useFilters } from '@/composables/filters'

export function useConnections() {
  const { formatCurrency } = useFilters()
  const connections = useConnectionsStore()

  const fetchConnectionsHandler = async () => {
    await connections.fetchConnections()
  }

  const getStoreCommission = commission => {
    if(!commission) return 'None'
    if(commission.type === 'percentage') return `${commission.value}%`
    if(commission.type === 'flat_rate') return formatCurrency(commission.value)
  }

  const getStoreStatus = status => {
    return status === 'active' ? 'success' : 'danger'
  }

  const showDisconnectStoreDialog = connection => {
    connections.selectedConnection = connection
    connections.isConnectionDisconnectRequested = true
  }

  const showSetCommissionDialog = connection => {
    connections.selectedConnection = connection
    connections.isSetCommissionRequested = true
  }

  return {
    connections,
    fetchConnectionsHandler,
    getStoreCommission,
    getStoreStatus,
    showDisconnectStoreDialog,
    showSetCommissionDialog,
  }
}
