<script setup>
import { useConnectionsStore } from 'connections';
import { useMarketPlaceStore } from 'marketPlace';
import axiosService from '@/composables/axios';

/* ----- Data ----- */
const {
  isSourceStore,
  storeId,
} = toRefs(useConnectionsStore());

const {
  categories,
  countries,
  fetchProfile,
  maxImagesAllowed,
  profile,
  updateProfile,
} = toRefs(useMarketPlaceStore());

const deletedImages = ref([]);
const fileSelectedForUpload = ref([]);
const loading = ref(false);

/* ----- Mounted ----- */
onMounted(async () => {
  await fetchProfile.value();
});

/* ----- Computed ----- */
const placeHolderImages = computed(() => {
  const uploadedImages = profile.value.cocoProfileImages?.length;
  return maxImagesAllowed.value - (uploadedImages);
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
  const uploadedImages = profile.value.cocoProfileImages?.length;
  const totalFiles = files.length + uploadedImages;
  const totalFilesAllowed = maxImagesAllowed.value - uploadedImages;

  if(totalFiles > maxImagesAllowed.value) {
    alert(`You can add up to ${maxImagesAllowed.value} images`)
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

const updateProfileHandler = async () => {
  await updateProfile.value();
}
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
      <Button @click="updateProfileHandler" label="Save" class="ml-3"></Button>
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
              <div class="font-medium text-3xl mb-3">Profile images - ({{ profile.cocoProfileImages?.length }}/{{ maxImagesAllowed }})</div>
              <div class="text-500">The order that images appear on your profile will be the same as the order here.</div>
              <div class="text-500 mb-3 mt-2">Include product images to give partner stores an understanding of what you sell.</div>
              <div class="absolute right-0 top-0" v-if="profile.cocoProfileImages?.length < maxImagesAllowed">
                <input
                  @change="fileUploadHandler"
                  accept="image/jpeg, image/png, image/jpg, image/webp, image/gif, image/ico"
                  class="absolute upload-btn w-100 h-100 top-0 left-0"
                  multiple
                  ref="fileSelectedForUpload"
                  type="file"
                >
                <Button @click="clickFileUploadButton" label="Upload Images" icon="pi pi-upload"></Button>
                <p class="text-center mt-1 m-0 text-sm text-600">You can add upto {{ maxImagesAllowed }} images</p>
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
