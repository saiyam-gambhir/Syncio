<script setup>
import * as routes from '@/routes';
import * as validationMessages from '@/validationMessages';

/* ----- Mounted ----- */
onMounted(async () => {
  await fetchProfilesHandler();
});

const fetchProfilesHandler = async () => {
  await fetchProfile.value();
};

/* ----- Data ----- */
const {
  storeId,
} = toRefs(useConnectionsStore());

const {
  categories,
  countries,
  fetchProfile,
  isPreviewProfileDialogVisible,
  loading,
  loadingProfile,
  maxImagesAllowed,
  profile,
  updateProfile,
} = toRefs(useMarketPlaceStore());

const deletedImages = ref([]);
const fileSelectedForUpload = ref([]);
const urlRegex = /^((([A-Za-z]{3,9}:(?:\/\/)?)(?:[\-;:&=\+\$,\w]+@)?[A-Za-z0-9\.\-]+|(?:www\.|[\-;:&=\+\$,\w]+@)[A-Za-z0-9\.\-]+)((?:\/[\+~%\/\.\w\-_]*)?\??(?:[\-\+=&;%@\.\w_]*)#?(?:[\.\!\/\\\w]*))?)/;
const progress = ref(25);

/* ----- Form ----- */
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
  if(progress.value === 25) {
    return brandNameError.value || websiteError.value;
  } else if (progress.value === 50) {
    return locationError.value || categoryError.value || numOfProductsError.value
  }
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

const goToNextStepHandler = () => {
  progress.value += 25;
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
  <section class="mx-auto" style="width: 800px;">
    <div class="mb-8 px-8 mx-8">
      <ProgressBar :value="progress" :showValue="false" />
    </div>

    <PageDetails title="Create your Marketplace profile" content="Your profile will help find like minded stores to connect with" />

    <aside class="auth-wrapper text-900">
      <template v-if="progress === 25">
        <h3 class="font-semi text-2xl mb-4">First, let's start with the basics</h3>
        <ul class="list-none p-0 m-0">
          <li class="flex align-items-center pb-3 pt-5 flex-wrap">
            <div class="w-12 font-bold">
              <label for="brandName" class="font-semibold">Business name</label>
            </div>
            <div class="text-900 w-12 mt-3">
              <InputText
                :class="{ 'mb-3 p-invalid': brandNameError }"
                type="text"
                id="brandName"
                class="w-100"
                v-model="profile.brandName">
              </InputText>
              <ValidationMessage :error="brandNameError" style="padding-bottom: 0 !important;" />
            </div>
          </li>
          <li class="flex align-items-center py-3 flex-wrap">
            <div class="w-12 font-bold">
              <label for="website" class="font-semibold">Store website</label>
            </div>
            <div class="text-900 w-12 mt-3">
              <InputText
                :class="{ 'mb-3 p-invalid': websiteError }"
                type="text"
                id="website"
                class="w-100"
                v-model="profile.website">
              </InputText>
              <ValidationMessage :error="websiteError" style="padding-bottom: 0 !important;" />
            </div>
          </li>
        </ul>
      </template>

      <template v-if="progress === 50">
        <h3 class="font-semi text-2xl mb-4">Now, add some details to help other stores understand your business</h3>
        <ul class="list-none p-0 m-0">
          <li class="flex align-items-center py-3 flex-wrap">
            <div class="w-12 font-bold">
              <label for="location" class="font-semibold">Location</label>
              <p class="text-light text-sm font-normal mt-2 mb-0">Your primary country of business</p>
            </div>
            <div class="text-900 w-12 mt-1">
              <Dropdown
                :autoOptionFocus="false"
                :class="{ 'mb-3 p-invalid': locationError }"
                :options="countries"
                class="w-100"
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
            <div class="w-12 font-bold">
              <label for="category" class="font-semibold">Primary product category</label>
            </div>
            <div class="text-900 w-12 mt-3">
              <Dropdown
                showClear
                :autoOptionFocus="false"
                :class="{ 'mb-3 p-invalid': categoryError }"
                :options="categories"
                class="w-100"
                inputId="category"
                placeholder="Select category"
                v-model="profile.category">
              </Dropdown>
              <ValidationMessage :error="categoryError" style="padding-bottom: 0 !important;" />
            </div>
          </li>

          <li class="flex align-items-center py-3 flex-wrap">
            <div class="w-12 font-bold">
              <label for="numOfProducts" class="font-semibold">Number of products</label>
            </div>
            <div class="text-900 w-12 mt-3">
              <InputText
                :class="{ 'mb-3 p-invalid': numOfProductsError }"
                class="w-100"
                id="numOfProducts"
                min="0"
                placeholder="Enter the number of products you stock"
                type="number"
                v-model="profile.numOfProducts">
              </InputText>
              <ValidationMessage :error="numOfProductsError" style="padding-bottom: 0 !important;" />
            </div>
          </li>
        </ul>
      </template>

      <template v-if="progress === 75">

      </template>

      <div class="border-top-1 border-400 my-5"></div>

      <div class="text-center">
        <div class="flex align-items-center justify-content-between">
          <div>
            <Button v-if="progress > 25" @click="progress -=25" label="Previous step" class="font-bold p-button-secondary"></Button>
          </div>
          <div class="flex align-items-center">
            <router-link :to="isDestinationStore ? routes.SHOPIFY_SELECT_PLAN : routes.SHOPIFY_INSTALLATION_COMPLETE">
              <a href="javascript:void(0);" class="btn-link mr-5 text-lg">Skip</a>
            </router-link>
            <Button @click="goToNextStepHandler" :disabled="isActionDisabled" label="Next" class="font-bold"></Button>
          </div>
        </div>
      </div>
    </aside>
  </section>
</template>
