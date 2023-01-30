import { useAuthStore } from '@/stores/auth'

export const fetchActvities = {
  async fetchActvities() {
    this.loadingActivities = true
    const auth = useAuthStore()
    const { activeTab } = this
    const response = await this.$https(`user/${auth.userId}/sync-events`, {
      params: {
        group: activeTab,
        limiter: 25
      }
    })

    if(activeTab === 'product') this.productIssues = await response.data.data
    else if(activeTab === 'order') this.orderIssues = await response.data.data
    else if(activeTab === 'general') this.generalUpdates = await response.data.data
    this.loadingActivities = false
  }
}
