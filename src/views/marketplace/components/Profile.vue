<script setup>
/* ----- Data ----- */
const {
  isMessageDialogVisible,
  selectedProfile,
} = toRefs(useMarketPlaceStore());

/* ----- Props ----- */
const props = defineProps({
  profile: {
    type: Object,
    required: true,
  },
});

/* ----- Computed ----- */
const profileData = computed(() => {
  const instagramHandle = props.profile?.coco_social_media[0]?.url;
  const imagesCount = props.profile?.coco_profile_images?.length;
  const shippingPolicyUrl = props.profile?.shipping_policy_url;
  const typicalMarginPercentage = props.profile?.typical_margin_precentage;

  return {
    imagesCount,
    instagramHandle,
    shippingPolicyUrl,
    typicalMarginPercentage,
  };
});


/* ----- Methods ----- */
const showMessageDialogHandler = profile => {
  isMessageDialogVisible.value = true;
  selectedProfile.value = { ...profile };
};
</script>

<template>
  <div class="profile col-3 relative">
    <div class="border-round shadow-2 surface-0 surface-border">
      <div v-if="profileData.imagesCount === 0" class="profile__image">
        <div class="image no-profile-image"></div>
      </div>
      <Carousel
        :numScroll="1"
        :numVisible="1"
        :showIndicators="profileData.imagesCount > 1"
        :showNavigators="profileData.imagesCount > 1"
        :value="profile.coco_profile_images" circular v-else>
        <template #previousicon>
          <IconPrevious />
        </template>
        <template #item="{ data }">
          <div class="profile__image">
            <div class="image profile-image" :style="{ backgroundImage: `url(${data.image_url})` }"></div>
          </div>
        </template>
        <template #nexticon>
          <IconNext />
        </template>
      </Carousel>
      <div class="profile__details p-3 pb-3">
        <h3 class="mb-0 flex justify-content-between">
          <span class="pr-2">
            <AppLink :label="profile.brand_name" :link="profile.website" />
          </span>
          <a v-if="profileData.instagramHandle" :href="profileData.instagramHandle" target="_blank">
            <IconInstagram />
          </a>
        </h3>
        <p class="m-0 mt-2">
          <span class="text-sm mr-1">Ships from</span>
          <strong class="font-semibold primary-color">{{ profile.location?.country }}</strong>
          (<a v-if="profileData.shippingPolicyUrl" :href="profileData.shippingPolicyUrl" class="btn-link">Policy</a>
          <span v-else class="text-sm">Request policy</span>)
        </p>
        <p class="mb-0 m-0 mt-2">
          <span class="text-sm mr-1">Published products</span>
          <strong class="font-semibold primary-color">{{ profile.num_of_products }}</strong>
        </p>
        <p class="mb-0 m-0 mt-2">
          <span class="text-sm mr-1">Typical margin</span>
          <strong v-if="profileData.typicalMarginPercentage" class="font-semibold primary-color">{{ `${profileData.typicalMarginPercentage}%` }}</strong>
          <span v-else class="font-semibold primary-color">Request pricing</span>
        </p>
        <Divider />

        <div class="flex">
          <Button
            @click="showMessageDialogHandler(profile)"
            class="p-button-success p-button-sm"
            label="Invite to connect"
            style="bottom: auto;">
          </Button>
        </div>
      </div>
    </div>
  </div>
</template>
