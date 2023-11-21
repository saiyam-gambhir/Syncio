export const sendMessage = {
  async sendMessage({ message, target_store_id }) {
    const params = {
      message,
      target_store_id,
    };

    const { success } = await axiosService.postData(`stores/${this.storeId}/coco-profiles/connection-request`, params);

    if(success) {
      this.isMessageDialogVisible = false;
      this.isMessageSentDialogVisible = true;
    }
  },
};
