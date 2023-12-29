export const activateCharge = {
  async activateCharge(payload) {

    const { addons, charge_id, plan_id } = payload;
    const { fetchUser } = useAuthStore();
    const usedId = sessionStorage.getItem('USER_ID');
    const params = {
      charge_id: charge_id,
      option_ids: addons,
      plan_id: plan_id,
      user_id: usedId,
    };

    const user = await fetchUser(usedId);
    if(user.success) {
      const response = await axiosService.postData(`/shopify/user/${usedId}/activate-charge`, params);
      return response;
    }
  }
};
