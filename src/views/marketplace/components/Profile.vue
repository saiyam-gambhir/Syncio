<script setup>
import { useMarketPlaceStore } from 'marketPlace';

/* ----- Data ----- */
const { isMessageDialogVisible, selectedProfile } = toRefs(useMarketPlaceStore());

/* ----- Props ----- */
const props = defineProps({
  profile: {
    type: Object,
    required: true,
  },
});

/* ----- Computed ----- */
const profileImagesCount = computed(() => {
  return props.profile?.coco_profile_images?.length;
});

const publshedProducts = computed(() => {
  return `${props.profile.num_of_products} published ${props.profile.num_of_products > 1 ? 'products' : 'product'
    }`;
});

const instagramHandle = computed(() => {
  return props.profile?.coco_social_media[0]?.url;
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
      <div v-if="profileImagesCount === 0" class="profile__image">
        <div class="image no-profile-image"></div>
      </div>
      <Carousel
        :numScroll="1"
        :numVisible="1"
        :showIndicators="profileImagesCount > 1"
        :showNavigators="profileImagesCount > 1"
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
      <div class="profile__details p-3 pb-7">
        <h3 class="mb-0 flex justify-content-between">
          <span class="pr-2">
            {{ profile.brand_name }}
          </span>
          <a v-if="instagramHandle" :href="instagramHandle" target="_blank">
            <IconInstagram />
          </a>
        </h3>
        <p class="mt-2 text-light">{{ profile.location?.country }}</p>
        <p class="mt-2 mb-0">{{ publshedProducts }}</p>
        <div class="mt-2 mb-0">
          <AppLink label="Website" :link="profile.website" />
        </div>

        <Divider />

        <Button
          @click="showMessageDialogHandler(profile)"
          class="absolute"
          label="Message"
          outlined
          style="right: 2rem;">
        </Button>
      </div>
    </div>
  </div>
</template>
