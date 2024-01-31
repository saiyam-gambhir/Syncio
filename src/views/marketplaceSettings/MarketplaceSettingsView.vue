<script setup>
import * as validationMessages from '@/validationMessages';

/* ----- Components ----- */
const ProfilePreviewDialog = defineAsyncComponent(() => import('./components/ProfilePreviewDialog.vue'));

/* ----- Data ----- */
const {
  isSourceStore,
  storeId,
} = toRefs(useConnectionsStore());

const {
  categories,
  countries,
  fetchProfile,
  isPreviewProfileDialogVisible,
  loadingProfile,
  maxImagesAllowed,
  profile,
  updateProfile,
} = toRefs(useMarketPlaceStore());

const deletedImages = ref([]);
const fileSelectedForUpload = ref([]);
const loading = ref(false);
const urlRegex = /^((([A-Za-z]{3,9}:(?:\/\/)?)(?:[\-;:&=\+\$,\w]+@)?[A-Za-z0-9\.\-]+|(?:www\.|[\-;:&=\+\$,\w]+@)[A-Za-z0-9\.\-]+)((?:\/[\+~%\/\.\w\-_]*)?\??(?:[\-\+=&;%@\.\w_]*)#?(?:[\.\!\/\\\w]*))?)/;

/* Form */
const brandNameError = ref(null);
const categoryError = ref(null);
const locationError = ref(null);
const numOfProductsError = ref(null);
const socialMediaError = ref(null);
const websiteError = ref(null);

/* ----- Mounted ----- */
onMounted(async () => {
  await fetchProfile.value();
});

/* ----- Computed ----- */
const placeHolderImages = computed(() => {
  const uploadedImages = profile.value?.cocoProfileImages?.length ?? 0;
  return uploadedImages ? maxImagesAllowed.value - (uploadedImages) : maxImagesAllowed.value;
});

const isActionDisabled = computed(() => {
  return brandNameError.value || categoryError.value || locationError.value || numOfProductsError.value || socialMediaError.value || websiteError.value;
});

/* ----- Methods ----- */
const clickFileUploadButton = () => {
  document.querySelector('.upload-btn').click();
};

const uploadFilesHandler = async () => {
  try {
    loading.value = true;
    const promises = fileSelectedForUpload.value.map(async (file) => {
      const formData = new FormData();
      formData.append('image', file);
      return await axiosService.uploadImage(`stores/${storeId.value}/coco-profiles/upload-image`, formData);
    });

    const res = await Promise.all(promises);
    res.forEach(image => {
      profile.value.cocoProfileImages = [...profile.value.cocoProfileImages, { image_url: image.url }];
    });
  } catch (err) {
  } finally {
    loading.value = false;
  }
};

const fileUploadHandler = () => {
  const files = fileSelectedForUpload.value.files;
  const uploadedImages = profile.value?.cocoProfileImages?.length ?? 0;
  const totalFiles = files.length + uploadedImages;
  const totalFilesAllowed = maxImagesAllowed.value - uploadedImages;

  if(totalFiles > maxImagesAllowed.value) {
    alert(`You can add up to ${maxImagesAllowed.value} images`);
    files.length = totalFilesAllowed;
  }

  fileSelectedForUpload.value = [...files];
  uploadFilesHandler();
};

const deleteFilesFromView = (image, index) => {
  if(image && image.image_url) {
    profile.value.cocoProfileImages.splice(index, 1);
    deletedImages.value.push(image.image_url);
  } else {
    profile.value.cocoProfileImages.splice(index, 1);
  }
};

/* ----- Validations ----- */
watch(profile, (newValue, oldValue) => {
  const { brandName, category, location, numOfProducts, socialMedia, website } = newValue;
  brandNameError.value = brandName?.length > 0 ? null : validationMessages.REQUIRED;
  categoryError.value = category?.length > 0 ? null : validationMessages.REQUIRED;
  locationError.value = location?.length > 0 ? null : validationMessages.REQUIRED;
  numOfProductsError.value = numOfProducts && numOfProducts > -1 > 0 ? null : validationMessages.REQUIRED;
  socialMediaError.value = !urlRegex.test(socialMedia) && socialMedia?.length > 0 ? validationMessages.URL_VERIFICATION : null;
  websiteError.value = urlRegex.test(website) ? null : validationMessages.URL_VERIFICATION;
}, { deep: true });
</script>

<template>
  <PageHeader
    content="Manage your Marketplace profile and settings"
    title="Marketplace settings"
    withActions>
    <template #actions>
      <span v-if="profile.updatedAt" class="text-light flex">
        <span class="font-bold">Last saved: </span>
        <Date :date="profile.updatedAt" horizontal />
      </span>
      <Button
        :disabled="isActionDisabled"
        @click="isPreviewProfileDialogVisible = true"
        class="ml-3"
        label="Preview"
        outlined>
      </Button>
      <Button
        :disabled="isActionDisabled"
        :label="profile.updatedAt ? 'Save' : 'Create profile'"
        :loading="loadingProfile"
        @click="updateProfile"
        class="ml-3">
      </Button>
    </template>
  </PageHeader>

  <form class="mt-2">
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
                    <InputText
                      :class="{ 'mb-3 p-invalid': brandNameError }"
                      type="text"
                      id="brandName"
                      class="w-66"
                      v-model="profile.brandName">
                    </InputText>

                    <ValidationMessage :error="brandNameError" style="padding-bottom: 0 !important;" />
                  </div>
                </li>

                <li class="flex align-items-center py-3 flex-wrap">
                  <div class="w-3 font-bold">
                    <label for="instagram" class="font-semibold">Instagram (optional)</label>
                  </div>
                  <div class="text-900 w-9">
                    <InputText
                      :class="{ 'mb-3 p-invalid': socialMediaError }"
                      class="w-66"
                      id="instagram"
                      type="text"
                      v-model="profile.socialMedia">
                    </InputText>

                    <ValidationMessage :error="socialMediaError" style="padding-bottom: 0 !important;" />
                  </div>
                </li>

                <li class="flex align-items-center py-3 flex-wrap">
                  <div class="w-3 font-bold">
                    <label for="website" class="font-semibold">Website</label>
                  </div>
                  <div class="text-900 w-9">
                    <InputText
                      :class="{ 'mb-3 p-invalid': websiteError }"
                      type="text"
                      id="website"
                      class="w-66"
                      v-model="profile.website">
                    </InputText>

                    <ValidationMessage :error="websiteError" style="padding-bottom: 0 !important;" />
                  </div>
                </li>

                <li class="flex align-items-center py-3 flex-wrap">
                  <div class="w-3 font-bold">
                    <label for="location" class="font-semibold">Location</label>
                  </div>
                  <div class="text-900 w-9">
                    <Dropdown
                      :autoOptionFocus="false"
                      :class="{ 'mb-3 p-invalid': locationError }"
                      :options="countries"
                      class="w-66"
                      editable
                      inputId="location"
                      placeholder="Select Country"
                      selectOnFocus
                      showClear
                      v-model="profile.location">
                    </Dropdown>

                    <ValidationMessage :error="locationError" style="padding-bottom: 0 !important;" />
                  </div>
                </li>

                <li class="flex align-items-center py-3 flex-wrap">
                  <div class="w-3 font-bold">
                    <label for="category" class="font-semibold">Store category</label>
                    <p class="text-light text-sm font-normal mt-1 mb-0">The primary category of products you sell</p>
                  </div>
                  <div class="text-900 w-9">
                    <Dropdown
                      showClear
                      :autoOptionFocus="false"
                      :class="{ 'mb-3 p-invalid': categoryError }"
                      :options="categories"
                      class="w-66"
                      inputId="category"
                      placeholder="Select category"
                      v-model="profile.category">
                    </Dropdown>

                    <ValidationMessage :error="categoryError" style="padding-bottom: 0 !important;" />
                  </div>
                </li>

                <li class="flex align-items-center py-3 flex-wrap">
                  <div class="w-3 font-bold">
                    <label for="numOfProducts" class="font-semibold">Number of products</label>
                  </div>
                  <div class="text-900 w-9">
                    <InputText
                      :class="{ 'mb-3 p-invalid': numOfProductsError }"
                      class="w-66"
                      id="numOfProducts"
                      min="0"
                      type="number"
                      v-model="profile.numOfProducts">
                    </InputText>

                    <ValidationMessage :error="numOfProductsError" style="padding-bottom: 0 !important;" />
                  </div>
                </li>

                <template v-if="isSourceStore">
                  <li class="flex align-items-center py-3 flex-wrap">
                    <div class="w-3 font-bold">
                      <label for="shippingPolicyUrl" class="font-semibold">Shipping policy URL (Optional)</label>
                      <p class="text-light text-sm font-normal mt-1 mb-0">If blank, your profile will read "Request policy"</p>
                    </div>
                    <div class="text-900 w-9">
                      <InputText id="shippingPolicyUrl" class="w-66" v-model="profile.shippingPolicyUrl" />
                    </div>
                  </li>

                  <li class="flex align-items-center py-3 flex-wrap">
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
                </template>
              </ul>
            </div>
          </template>
        </CardWrapper>
      </section>

      <section class="col-12 mt-4">
        <CardWrapper>
          <template #content>
            <div class="surface-section relative">
              <div class="font-medium text-3xl mb-3">Profile images - ({{ profile?.cocoProfileImages?.length ?? 0 }}/{{ maxImagesAllowed }})</div>
              <div class="text-500">The order that images appear on your profile will be the same as the order here.</div>
              <div class="text-500 mb-3 mt-2">Include product images to give partner stores an understanding of what you sell.</div>
              <div class="absolute right-0 top-0" v-if="profile?.cocoProfileImages?.length < maxImagesAllowed || !profile.cocoProfileImages">
                <input
                  @change="fileUploadHandler"
                  accept="image/jpeg, image/png, image/jpg, image/webp, image/gif, image/ico"
                  class="absolute upload-btn w-100 h-100 top-0 left-0"
                  multiple
                  ref="fileSelectedForUpload"
                  type="file" />
                <Button :loading="loading" @click="clickFileUploadButton" label="Upload Images" icon="pi pi-upload"></Button>
                <p class="text-center mt-1 m-0 text-sm text-600">You can add up to {{ maxImagesAllowed }} images</p>
              </div>

              <ul class="list-none p-0 m-0">
                <li class="flex align-items-center pt-2 border-top-1 surface-border flex-wrap pt-5">
                  <div class="w-100">
                    <div class="grid">
                      <div class="col-2" v-for="(image, index) in profile.cocoProfileImages" :key="image.image_url">
                        <div class="image-placeholder relative" :style="{ backgroundImage: `url(${image.image_url})` }" style="background-position: center; background-repeat: no-repeat; background-size: contain;">
                          <span class="absolute delete-image-btn" v-tooltip.top="'Delete'" @click="deleteFilesFromView(image, index)">
                            <i class="pi pi-trash"></i>
                          </span>
                        </div>
                      </div>
                      <div class="col-2" v-for="image in placeHolderImages" :key="image">
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

  <ProfilePreviewDialog v-if="isPreviewProfileDialogVisible" />
</template>

<style scoped>
.image-placeholder {
  background: #e5e5e5;
  height: 12.5rem;
}

.upload-btn {
  cursor: pointer;
  opacity: 0;
  visibility: hidden;
  z-index: 1;
}

.delete-image-btn {
  align-items: center;
  background: #fff;
  border-radius: 20px;
  border: 1px solid #9b0d0d;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.03), 0px 0px 2px rgba(0, 0, 0, 0.06), 0px 2px 6px rgba(0, 0, 0, 0.12);
  color: #9b0d0d;
  cursor: pointer;
  display: flex;
  font-weight: bold;
  height: 2rem;
  justify-content: center;
  right: -.9rem;
  top: -.9rem;
  width: 2rem;
}
</style>
