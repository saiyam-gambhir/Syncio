<script setup>
import { computed } from 'vue'
import { useMarketPlaceStore } from '@/stores/marketPlace'

/* ----- COMPONENTS ----- */
import IconNext from '@/components/icons/IconNext.vue'
import IconPrevious from '@/components/icons/IconPrevious.vue'

/* ----- DATA ----- */
const marketPlace = useMarketPlaceStore()

/* ----- PROPS ----- */
const props = defineProps({
  profile: {
    type: Object,
    required: true
  }
})

/* ----- COMPUTED ----- */
const profileImagesCount = computed(() => {
  return props.profile?.coco_profile_images?.length
})

const publshedProducts = computed(() => {
  return `${props.profile.num_of_products} published ${props.profile.num_of_products > 1 ? 'products' : 'product' }`
})

/* ----- METHODS ----- */
</script>

<template>
  <div class="profile col-3 relative">
    <div v-if="profileImagesCount === 0" class="profile__image">
      <div class="image no-profile-image"></div>
    </div>
    <Carousel
      :numScroll="1"
      :numVisible="1"
      :showIndicators="profileImagesCount > 1"
      :showNavigators="profileImagesCount > 1"
      :value="profile.coco_profile_images"
      circular
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
    <div class="profile__details">
      <h3>{{ profile.brand_name }}</h3>
      <p class="text-light">{{ profile.location?.country }}</p>
      <p>{{ publshedProducts }}</p>
      <Button label="Message" class="absolute"></Button>
    </div>
  </div>
</template>
