<script setup>
import * as routes from '@/routes';

/* ----- Data ----- */
const {
  isSourceStore,
} = toRefs(useConnectionsStore());

const {
  loading,
  loadingProfile,
} = toRefs(useMarketPlaceStore());

/* ----- Props ----- */
const props = defineProps({
  profile: Object,
  required: true,
});
</script>

<template>
  <CardWrapper class="min-h-full">
    <template #content>
      <div class="font-medium font-bold text-xl mb-4">My Store</div>
      <div class="grid profiles">
        <div class="col col-5">
          <div class="profile__image" v-if="profile.cocoProfileImages.length === 0">
            <div class="image no-profile-image"></div>
          </div>
          <Carousel
            :numScroll="1"
            :numVisible="1"
            :showIndicators="profile.cocoProfileImages.length > 1"
            :showNavigators="profile.cocoProfileImages.length > 1"
            :value="profile.cocoProfileImages" circular
            v-else>
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
        </div>
        <div class="col col-7 text-md">
          <template v-if="loadingProfile">
            <Skeleton width="90%" height="24px" borderRadius="0"></Skeleton>
            <Skeleton class="mt-3" width="75%" height="24px" borderRadius="0"></Skeleton>
            <Skeleton class="mt-3" width="60%" height="24px" borderRadius="0"></Skeleton>
            <Skeleton class="mt-3" width="45%" height="24px" borderRadius="0"></Skeleton>
          </template>
          <template v-else>
            <h3 class="mb-0 flex justify-content-start">
              <span class="pr-2">
                <AppLink class="text-lg" :label="profile.brandName" :link="profile.website" />
              </span>
              <a v-if="profile.socialMedia" :href="profile.socialMedia" target="_blank">
                <IconInstagram />
              </a>
            </h3>
            <p class="m-0 mt-3" v-if="profile.location">
              <span class="mr-1">Ships from</span>
              <strong class="font-semibold primary-color">{{ profile.location }}</strong>
              <a v-if="profile.shippingPolicyUrl" :href="profile.shippingPolicyUrl" class="btn-link"> (Policy)</a>
              <span v-else-if="!profile.shippingPolicyUrl && isSourceStore" class="text-sm"> (Request policy)</span>
            </p>
            <p class="m-0 mt-3">
              <span class="mr-1">Published products</span>
              <strong class="font-semibold primary-color">{{ profile.numOfProducts }}</strong>
            </p>
            <p class="m-0 mt-3" v-if="isSourceStore">
              <span class="mr-1" >Typical margin</span>
              <strong v-if="profile.typicalMarginPrecentage" class="font-semibold primary-color">
                {{ `${profile.typicalMarginPrecentage}%` }}
              </strong>
              <span v-else-if="!profile.typicalMarginPrecentage && isSourceStore" class="font-semibold primary-color">Request pricing</span>
            </p>
            <router-link :to="routes.MARKETPLACE_SETTINGS">
              <Button class="mt-5 p-button-sm" label="Settings" outlined></Button>
            </router-link>
          </template>
        </div>
      </div>
    </template>
  </CardWrapper>
</template>
