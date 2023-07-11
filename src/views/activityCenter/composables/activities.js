import { useActivityCenterStore } from '@/stores/activityCenter';

export function useActivities() {
  const activityCenter = useActivityCenterStore();

  const deleteActivityHandler = async activityId => {
    await activityCenter.deleteActivity(activityId);
  };

  const fetchActivitiesHandler = async (page) => {
    await activityCenter.fetchActivities(page);
  };

  return {
    activityCenter,
    deleteActivityHandler,
    fetchActivitiesHandler,
  };
}
