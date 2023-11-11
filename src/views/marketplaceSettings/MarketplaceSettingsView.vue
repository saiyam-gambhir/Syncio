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
      <section class="col-12">
        <CardWrapper>
          <template #content>
            <div class="surface-section">
              <div class="font-medium text-3xl mb-3">Profile details</div>
              <ul class="list-none p-0 m-0">
                <li class="flex align-items-center pb-3 pt-5 border-top-1 surface-border flex-wrap">
                  <div class="w-3 font-bold">
                    <label for="brandName" class="font-semibold">Brand Name</label>
                  </div>
                  <div class="text-900 w-9">
                    <InputText type="text" id="brandName" class="w-66" v-model="profile.brandName" />
                  </div>
                </li>

                <li class="flex align-items-center py-3 flex-wrap">
                  <div class="w-3 font-bold">
                    <label for="instagram" class="font-semibold">Instagram (optional)</label>
                  </div>
                  <div class="text-900 w-9">
                    <InputText type="text" id="instagram" class="w-66" v-model="profile.socialMedia" />
                  </div>
                </li>

                <li class="flex align-items-center py-3 flex-wrap">
                  <div class="w-3 font-bold">
                    <label for="website" class="font-semibold">Website</label>
                  </div>
                  <div class="text-900 w-9">
                    <InputText type="text" id="website" class="w-66" v-model="profile.website" />
                  </div>
                </li>

                <li class="flex align-items-center py-3 flex-wrap">
                  <div class="w-3 font-bold">
                    <label for="location" class="font-semibold">Location</label>
                  </div>
                  <div class="text-900 w-9">
                    <Dropdown
                      :autoOptionFocus="false"
                      :options="countries"
                      class="w-66"
                      editable placeholder="Select Country"
                      inputId="location"
                      selectOnFocus
                      v-model="profile.location">
                    </Dropdown>
                  </div>
                </li>

                <li class="flex align-items-center py-3 flex-wrap">
                  <div class="w-3 font-bold">
                    <label for="category" class="font-semibold">Store category</label>
                    <p class="text-light text-sm font-normal mt-1 mb-0">The primary category of products you sell</p>
                  </div>
                  <div class="text-900 w-9">
                    <Dropdown
                      :autoOptionFocus="false"
                      :options="categories"
                      class="w-66"
                      editable placeholder="Select category"
                      inputId="category"
                      v-model="profile.category">
                    </Dropdown>
                  </div>
                </li>

                <li class="flex align-items-center py-3 flex-wrap">
                  <div class="w-3 font-bold">
                    <label for="numOfProducts" class="font-semibold">Number of products</label>
                  </div>
                  <div class="text-900 w-9">
                    <InputText type="number" min="0" id="numOfProducts" class="w-66" v-model="profile.numOfProducts" />
                  </div>
                </li>

                <li v-if="isSourceStore" class="flex align-items-center py-3 flex-wrap">
                  <div class="w-3 font-bold">
                    <label for="shippingPolicyUrl" class="font-semibold">Shipping policy URL (Optional)</label>
                    <p class="text-light text-sm font-normal mt-1 mb-0">If blank, your profile will read "Request policy"</p>
                  </div>
                  <div class="text-900 w-9">
                    <InputText id="shippingPolicyUrl" class="w-66" v-model="profile.shippingPolicyUrl" />
                  </div>
                </li>

                <li v-if="isSourceStore" class="flex align-items-center py-3 flex-wrap">
                  <div class="w-3 font-bold">
                    <label for="typicalMarginPrecentage" class="font-semibold">Typical margin (Optional)</label>
                    <p class="text-light text-sm font-normal mt-1 mb-0">If blank, your profile will read "Request pricing". <br> You can provide product specific margins when <br> another store initiates a connection request.</p>
                  </div>
                  <div class="text-900 w-9">
                    <div class="p-inputgroup w-66">
                      <InputText id="typicalMarginPrecentage" type="number" min="0" v-model="profile.typicalMarginPrecentage" />
                      <span class="p-inputgroup-addon">%</span>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </template>
        </CardWrapper>
      </section>

      <section class="col-12 mt-4">
        <CardWrapper>
          <template #content>
            <div class="surface-section">
              <div class="font-medium text-3xl mb-3">Profile images</div>
              <div class="text-500">The order that images appear on your profile will be the same as the order here.</div>
              <div class="text-500 mb-3 mt-2">Include product images to give partner stores an understanding of what you sell.</div>
              <ul class="list-none p-0 m-0">
                <li class="flex align-items-center pt-2 border-top-1 surface-border flex-wrap">
                  <div class="w-100">
                    <div class="grid">
                      <div class="col-2" style="margin-top: 1rem;" v-for="image in profile.cocoProfileImages" :key="image.image_url">
                        <div :style="{ backgroundImage: `url(${image.image_url})` }" style="background-position: center; background-repeat: no-repeat; background-size: contain; background-color: #e5e5e5; height: 154px;"></div>
                      </div>
                      <div class="col-2" style="margin-top: 1rem;" v-for="image in placeHolderImages" :key="image">
                        <div class="image-placeholder"></div>
                      </div>
                    </div>
                  </div>
                </li>
              </ul>
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
