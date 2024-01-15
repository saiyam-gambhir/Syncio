export const addComment = {
  async addComment(comment, payoutId) {
    try {
      this.loadingComment = true;
      const params = {
        comment: comment,
        current_store_id: this.storeId,
        payout_id: payoutId,
      };

      const { success } = await axiosService.postData('stores/payout/create-payout-comment', params);
      if(success) {
        await this.fetchPayoutEvents(payoutId);
      }
    } catch (error) {
    } finally {
      this.loadingComment = false;
    }
  }
};
