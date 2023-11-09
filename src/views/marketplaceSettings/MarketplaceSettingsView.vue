<script setup>
import { useMarketPlaceStore } from 'marketPlace';

/* ----- Data ----- */
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
</script>

<template>
  <PageHeader
    content="Manage your Marketplace profile and settings"
    title="Marketplace settings">
  </PageHeader>

  <form class="mt-5">
    <article class="grid justify-content-between">
      <section class="col-12 md:col-6 lg:col-6">
        <h2 class="pb-3">Profile details</h2>

        <CardWrapper>
          <template #content>
            <div class="flex flex-column gap-2">
              <label for="brandName" class="font-semibold">Brand Name</label>
              <InputText type="text" id="brandName" v-model="profile.brandName" />
            </div>

            <div class="flex flex-column gap-2 mt-5">
              <label for="instagram" class="font-semibold">Instagram (optional)</label>
              <InputText type="text" id="instagram" v-model="profile.socialMedia" />
            </div>

            <div class="flex flex-column gap-2 mt-5">
              <label for="website" class="font-semibold">Website</label>
              <InputText type="text" id="website" v-model="profile.website" />
            </div>

            <div class="flex flex-column gap-2 mt-5">
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

            <div class="flex flex-column gap-2 mt-5">
              <label for="category" class="font-semibold">Store category</label>
              <span class="text-light text-sm">The primary category of products you sell</span>
              <Dropdown
                :autoOptionFocus="false"
                :options="categories"
                class="w-full"
                editable placeholder="Select category"
                inputId="category"
                showClear
                v-model="profile.category">
              </Dropdown>
            </div>

            <div class="flex flex-column gap-2 mt-5">
              <label for="numOfProducts" class="font-semibold">Number of products</label>
              <InputText type="number" min="0" id="numOfProducts" v-model="profile.numOfProducts" />
            </div>
          </template>
        </CardWrapper>
      </section>

      <section class="col-12 md:col-6 lg:col-6">
        <h2 class="pb-3">Profile images</h2>

        <CardWrapper>
          <template #content>
            <p class="text-light m-0">The order that images appear on your profile will be the same as the order here.</p>
            <p class="text-light mb-0 mt-2">Include product images to give partner stores an understanding of what you sell.</p>

            <div class="grid mt-3">
              <div class="col-4 mt-2" v-for="image in maxImagesAllowed">
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
