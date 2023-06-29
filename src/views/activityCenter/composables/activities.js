import { useActivityCenterStore } from '@/stores/activityCenter';

export function useActivities() {
  const activityCenter = useActivityCenterStore();

  const deleteActivityHandler = async activityId => {
    await activityCenter.deleteActivity(activityId);
  };

  const fetchActivitiesHandler = async () => {
    await activityCenter.fetchActivities();
  };

  return {
    activityCenter,
    deleteActivityHandler,
    fetchActivitiesHandler,
  };
}
