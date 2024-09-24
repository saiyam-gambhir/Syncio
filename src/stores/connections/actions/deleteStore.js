export const DELETE_STORE = {
  async DELETE_STORE() {
    try {
      const { userId } = useAuthStore();
      const { fetchCurrentPlan } = usePlanStore();

      // Delete store profile by ID
      const response = await axiosService.deleteData(`user/${userId}/stores/${this.storeId}/profile`);

      // Fetch current plan after store deactivation
      await fetchCurrentPlan(userId);

      // Redirect to confirmation page if charge exists
      if (response.charge?.confirmation_url) {
        window.location.href = response.charge.confirmation_url;
      }
    } catch (error) {}
  },
};
