export const fetchInventory = {
  async fetchInventory({ location_id, origin, product_id, source_store_id }) {
    const params = {
      location_id,
      origin,
      product_id,
      source_store_id,
    }

    const response = await axiosService.postData('shopify/product-inventory-count', params);
    return response;
  }
};
