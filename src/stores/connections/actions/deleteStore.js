export const DELETE_STORE = {
  async DELETE_STORE() {
    const { userId } = useAuthStore();

    const {
      fetchCurrentPlan,
    } = usePlanStore();

    const response = await axiosService.deleteData(`user/${userId}/stores/${this.storeId}/profile`);

    /* Fetch current plan after deactivation */
    await fetchCurrentPlan(userId);

    if(response.charge) {
      window.location.href = response.charge.confirmation_url;
    }
  },
};
