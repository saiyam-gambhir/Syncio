import { useActivityCenterStore } from '@/stores/activityCenter'

export function useActivities() {
  const activityCenter = useActivityCenterStore()

  const deleteActivityHandler = (activityId) => {
    activityCenter.deleteActivity(activityId)
  }

  const fetchActivitiesHandler = async (activeTabIndex) => {
    activityCenter.activeTabIndex = activeTabIndex
    await activityCenter.fetchActvities()
  }

  return {
    activityCenter,
    deleteActivityHandler,
    fetchActivitiesHandler
  }
}
