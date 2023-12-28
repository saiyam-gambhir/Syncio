export const activateCharge = {
  async activateCharge(payload) {

    const { addons, charge_id, plan_id } = payload;
    const { fetchUser, userId } = useAuthStore();
    const params = {
      charge_id: charge_id,
      option_ids: addons,
      plan_id: plan_id,
      user_id: userId,
    };

    const user = await fetchUser(sessionStorage.getItem('USER_ID'));
    debugger
    if(user.success) {
      const response = await axiosService.postData(`/shopify/user/${userId}/activate-charge`, params);
      return response;
    }
  }
};
