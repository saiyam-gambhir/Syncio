export const deleteActivity = {
  async deleteActivity(activityId) {
    this.loadingActivities = true;
    const { userId } = useAuthStore();
    const response = await axiosService.deleteData(`user/${userId}/sync-events/${activityId}`);
    await this.fetchActivities();
  },
};
