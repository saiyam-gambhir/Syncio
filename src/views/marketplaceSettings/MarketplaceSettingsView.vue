<script setup>
import { useConnectionsStore } from 'connections';
import { useMarketPlaceStore } from 'marketPlace';

/* ----- Data ----- */
const {
  isSourceStore,
} = toRefs(useConnectionsStore());

const {
  categories,
  countries,
  maxImagesAllowed,
  profile,
  fetchProfile,
} = toRefs(useMarketPlaceStore());

/* ----- Mounted ----- */
onMounted(async () => {
  await fetchProfile.value();
});

/* ----- Computed ----- */
const placeHolderImages = computed(() => {
  const uploadedImages = profile.value.cocoProfileImages?.length;
  return maxImagesAllowed.value - (uploadedImages);
});
</script>

<template>
  <PageHeader
    content="Manage your Marketplace profile and settings"
    title="Marketplace settings"
    withActions>
    <template #actions>
      <span class="text-light flex">
        <span class="font-bold">Last saved: </span>
        <Date :date="profile.updatedAt" horizontal />
      </span>
      <Button label="Preview" outlined class="ml-3"></Button>
      <Button label="Save" class="ml-3"></Button>
    </template>
  </PageHeader>

  <form class="mt-5">
    <article class="grid justify-content-between">
      <section class="col-12 md:col-6 lg:col-6">
        <h2 class="pb-3">Profile details</h2>

        <CardWrapper>
          <template #content>
            <div class="grid">
              <div class="col-6 flex flex-column gap-3">
                <label for="brandName" class="font-semibold">Brand Name</label>
                <InputText type="text" id="brandName" v-model="profile.brandName" />
              </div>

              <div class="col-6 flex flex-column gap-3">
                <label for="instagram" class="font-semibold">Instagram (optional)</label>
                <InputText type="text" id="instagram" v-model="profile.socialMedia" />
              </div>
            </div>

            <div class="grid mt-5">
              <div class="col-6 flex flex-column gap-3">
                <label for="website" class="font-semibold">Website</label>
                <InputText type="text" id="website" v-model="profile.website" />
              </div>

              <div class="col-6 flex flex-column gap-3">
                <label for="location" class="font-semibold">Location</label>
                <Dropdown
                  :autoOptionFocus="false"
                  :options="countries"
                  class="w-full"
                  editable placeholder="Select Country"
                  inputId="location"
                  showClear
                  selectOnFocus
                  v-model="profile.location">
                </Dropdown>
              </div>
            </div>

            <div class="grid mt-5">
              <div class="col-6 flex flex-column gap-3">
                <label for="category" class="font-semibold">Store category</label>
                <Dropdown
                  :autoOptionFocus="false"
                  :options="categories"
                  class="w-full"
                  editable placeholder="Select category"
                  inputId="category"
                  showClear
                  v-model="profile.category">
                </Dropdown>
                <span class="text-light text-sm">The primary category of products you sell</span>
              </div>

              <div class="col-6 flex flex-column gap-3">
                <label for="numOfProducts" class="font-semibold">Number of products</label>
                <InputText type="number" min="0" id="numOfProducts" v-model="profile.numOfProducts" />
              </div>
            </div>

            <div v-if="isSourceStore" class="grid mt-5">
              <div class="col-6 flex flex-column gap-3">
                <label for="shippingPolicyUrl" class="font-semibold">Shipping policy URL (Optional)</label>
                <InputText id="shippingPolicyUrl" v-model="profile.shippingPolicyUrl" />
                <span class="text-light text-sm">If blank, your profile will read "Request policy"</span>
              </div>

              <div class="col-6 flex flex-column gap-3">
                <label for="typicalMarginPrecentage" class="font-semibold">Typical margin (Optional)</label>
                <InputText type="number" min="0" id="typicalMarginPrecentage" v-model="profile.typicalMarginPrecentage" />
                <span class="text-light text-sm line-height-3">If blank, your profile will read "Request pricing". You can provide product specific margins when another store initiates a connection request.</span>
              </div>
            </div>
          </template>
        </CardWrapper>
      </section>

      <Divider layout="vertical" />

      <section style="width: 45rem;">
        <h2 class="pb-4">Profile images</h2>

        <CardWrapper>
          <template #content>
            <p class="text-light m-0">The order that images appear on your profile will be the same as the order here.</p>
            <p class="text-light mb-0 mt-2">Include product images to give partner stores an understanding of what you sell.</p>

            <div class="grid mt-2">
              <div class="col-4" style="margin-top: 1rem;" v-for="image in profile.cocoProfileImages" :key="image.image_url">
                <div :style="{ backgroundImage: `url(${image.image_url})` }" style="background-position: center; background-repeat: no-repeat; background-size: contain; background-color: #e5e5e5; height: 154px;"></div>
              </div>
              <div class="col-4" style="margin-top: 1rem;" v-for="image in placeHolderImages" :key="image">
                <div class="image-placeholder"></div>
              </div>
            </div>
          </template>
        </CardWrapper>
      </section>
    </article>
  </form>
</template>

<style scoped>
.image-placeholder {
  background: #e5e5e5;
  height: 154px;
}
</style>
