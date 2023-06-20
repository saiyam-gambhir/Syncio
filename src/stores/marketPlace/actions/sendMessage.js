export const sendMessage = {
  async sendMessage({ storeId, message, target_store_id}) {
    const response = await this.$https.post(`stores/${storeId}/coco-profiles/connection-request`, {
      message,
      target_store_id
    })
  }
}
