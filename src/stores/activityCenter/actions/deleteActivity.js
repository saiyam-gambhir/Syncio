import { useAuthStore } from 'auth';

export const deleteActivity = {
  async deleteActivity(activityId) {
    this.loadingActivities = true;
    const auth = useAuthStore();
    const response = axiosService.deleteData(`user/${auth.userId}/sync-events/${activityId}`);
    await this.fetchActivities();
  },
};
