import axiosService from '@/composables/axios';

export const updateProfile = {
  async updateProfile() {
    const {
      brandName,
      category,
      cocoProfileImages,
      socialMedia,
      location,
      numOfProducts,
      shippingPolicyUrl,
      typicalMarginPrecentage,
      website
    } = this.profile;

    const images = cocoProfileImages.map(image => image.image_url);

    const country = {
      city: '-',
      country: location
    };

    const params = {
      brand_name: brandName,
      category: category,
      images: images,
      instagram_url: socialMedia,
      location: country,
      num_of_products: numOfProducts,
      shipping_policy_url: shippingPolicyUrl,
      typical_margin_precentage: typicalMarginPrecentage,
      website: website,
    };

    const { profile, success } = await axiosService.postData(`stores/${this.storeId}/coco-profile`, params);

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
        cocoProfileImages: coco_profile_images,
        location: location?.country,
        numOfProducts: num_of_products,
        shippingPolicyUrl: shipping_policy_url,
        socialMedia: coco_social_media[0]?.url,
        typicalMarginPrecentage: typical_margin_precentage,
        updatedAt: updated_at,
        website,
      };
    }
  },
};
