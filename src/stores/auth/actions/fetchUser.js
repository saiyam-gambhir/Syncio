export const fetchUser = {
  async fetchUser(userID) {
    const { user } = await axiosService.getData(`user/${userID}`);
    this.user = await user;
  },
};
