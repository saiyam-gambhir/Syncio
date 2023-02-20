import { useActivityCenterStore } from '@/stores/activityCenter'
import { useToasts } from '@/composables/toasts'

export function useActivities() {
  const activityCenter = useActivityCenterStore()
  const { showToast } = useToasts()

  const deleteActivityHandler = async activityId => {
    const message = await activityCenter.deleteActivity(activityId)
    showToast({ detail: message })
  }

  const fetchActivitiesHandler = async activeTabIndex => {
    activityCenter.activeTabIndex = activeTabIndex
    await activityCenter.fetchActvities()
  }

  return {
    activityCenter,
    deleteActivityHandler,
    fetchActivitiesHandler,
  }
}
