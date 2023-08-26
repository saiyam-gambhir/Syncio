import { useAuthStore } from 'auth';

export const deleteActivity = {
  async deleteActivity(activityId) {
    this.loadingActivities = true;
    const auth = useAuthStore();
    const response = await this.$https.delete(
      `user/${auth.userId}/sync-events/${activityId}`
    );
    await this.fetchActivities();
  },
};
