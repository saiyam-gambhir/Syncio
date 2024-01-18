export const fetchProfile = {
  async fetchProfile() {
    this.loadingProfile = true;
    const { profile, success } = await axiosService.getData(`stores/${this.storeId}/coco-profile`);
    this.loadingProfile = false;
    if(success) {
      const {
        brand_name,
        category,
        coco_profile_images,
        coco_social_media,
        location,
        num_of_products,
        shipping_policy_url,
        typical_margin_precentage,
        updated_at,
        website,
      } = profile;

      this.profile = {
        brandName: brand_name,
        category,
        cocoProfileImages: coco_profile_images ?? [],
        location: location?.country,
        numOfProducts: num_of_products,
        shippingPolicyUrl: shipping_policy_url,
        socialMedia: coco_social_media && coco_social_media[0] && coco_social_media[0].url,
        typicalMarginPrecentage: typical_margin_precentage,
        updatedAt: updated_at,
        website,
      };
    }
  },
};
