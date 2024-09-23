<script setup>
/* ----- Data ----- */
const {
  isPreviewProfileDialogVisible,
  profile,
} = toRefs(useMarketPlaceStore());

const {
  isSourceStore,
} = toRefs(useConnectionsStore());

/* ----- Methods ----- */
const closeDialogHandler = () => {
  isPreviewProfileDialogVisible.value = false;
};
</script>

<template>
  <DialogWrapper :isVisible="isPreviewProfileDialogVisible" @closeDialog="closeDialogHandler" title="Profile Preview" width="700px" :showFooter="false">
    <template #body>
      <div class="grid">
        <div class="col col-5">
          <p class="text-lg text-700 m-0 pb-3 line-height-3">
            This is how your profile will appear on the marketplace.
          </p>
          <p class="text-lg text-700 m-0 line-height-3">
            When other stores message you, you'll receive an email with their details and an optional personal message.
          </p>
        </div>
        <div class="col col-1">
          <Divider layout="vertical" class="m-0" />
        </div>
        <div class="col col-6">
          <div class="marketplace">
            <div class="border-round shadow-2 surface-0 surface-border profiles">
              <div v-if="profile?.cocoProfileImages?.length === 0 || !profile.cocoProfileImages" class="profile__image">
                <div class="image no-profile-image"></div>
              </div>
              <Carousel
                :numScroll="1"
                :numVisible="1"
                :showIndicators="profile?.cocoProfileImages?.length > 1"
                :showNavigators="profile?.cocoProfileImages?.length > 1"
                :value="profile.cocoProfileImages"
                circular
                v-else-if="profile?.cocoProfileImages?.length > 0">
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
                <h3 class="mb-0 flex justify-content-start">
                  <span class="pr-2">
                    <AppLink :label="profile.brandName" :link="profile.website" />
                  </span>
                  <a v-if="profile.socialMedia" :href="profile.socialMedia" target="_blank">
                    <IconInstagram />
                  </a>
                </h3>
                <p class="m-0 mt-2" v-if="profile.location">
                  <span class="text-sm mr-1">Ships from</span>
                  <strong class="font-semibold primary-color">{{ profile.location?.name }}</strong>
                  <a v-if="profile.shippingPolicyUrl" :href="profile.shippingPolicyUrl" class="btn-link"> (Policy)</a>
                  <span v-else-if="!profile.shippingPolicyUrl && isSourceStore" class="text-sm"> (Request policy)</span>
                </p>
                <p class="mb-0 m-0 mt-2" v-if="profile.numOfProducts">
                  <span class="text-sm mr-1">Published products</span>
                  <strong class="font-semibold primary-color">{{ profile.numOfProducts }}</strong>
                </p>
                <p class="mb-0 m-0 mt-2" v-if="isSourceStore">
                  <span class="text-sm mr-1">Typical margin</span>
                  <strong v-if="profile.typicalMarginPrecentage" class="font-semibold primary-color">
                    {{ `${profile.typicalMarginPrecentage}%` }}
                  </strong>
                  <span v-else-if="!profile.typicalMarginPrecentage && isSourceStore" class="font-semibold primary-color">Request pricing</span>
                </p>

                <Divider />

                <div class="flex">
                  <Button
                    class="p-button-success p-button-sm"
                    label="Invite to connect"
                    style="bottom: auto;">
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </template>
  </DialogWrapper>
</template>
