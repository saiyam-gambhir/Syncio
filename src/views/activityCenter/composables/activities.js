import { useActivityCenterStore } from '@/stores/activityCenter'
import { useToasts } from '@/composables/toasts'

export function useActivities() {
  const activityCenter = useActivityCenterStore()
  const { showToast } = useToasts()

  const deleteActivityHandler = async activityId => {
    const message = await activityCenter.deleteActivity(activityId)
    showToast({ message })
  }

  const fetchActivitiesHandler = async () => {
    await activityCenter.fetchActvities()
  }

  return {
    activityCenter,
    deleteActivityHandler,
    fetchActivitiesHandler,
  }
}
