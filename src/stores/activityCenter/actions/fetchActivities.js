import { useAuthStore } from '@/stores/auth'

export const fetchActvities = {
  async fetchActvities() {
    this.loadingActivities = true
    const { userId } = useAuthStore()
    const { activeTab } = this
    const tabDataMap = {
      product: { tab: 'productIssues', queries: { ...this.productQueries } },
      order: { tab: 'orderIssues', queries: { ...this.orderQueries } },
      general: { tab: 'generalUpdates', queries: { ...this.generalQueries } },
    }
    const { tab, queries } = tabDataMap[activeTab]
    const response = await this.$https(`user/${userId}/sync-events`, {
      params: {
        ...queries,
        group: activeTab,
        limiter: 25,
      },
    })

    this[tab] = await response.data.data
    this.loadingActivities = false
  }
}
