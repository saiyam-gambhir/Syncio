<script setup>
/* ----- Data ----- */
const {
  isPushOrderShippingTagsChanged,
  loadingSettings,
  pushOrderShippingTags,
  shippingTags,
  stringifyPushOrderShippingTags,
  updatePushSettings,
} = toRefs(useOrdersStore());

/* ----- Watch ----- */
watch(shippingTags, (newValue, oldValue) => {
  if(newValue) {
    isPushOrderShippingTagsChanged.value = JSON.stringify(newValue) !== stringifyPushOrderShippingTags.value;
  }
}, { deep: true });

/* ----- Methods ----- */
const editTagHandler = (tag) => {
  tag.editMode = !tag.editMode;
  // const tagValue = tag?.value;
  // updateTag(tagValue, tag);
};

const updateTag = (event, tag) => {
  if(event.value) { tag.value = event.target.value?.trim(); }
  tag.editMode = false;
};

const cancelHandler = () => {
  shippingTags.value = JSON.parse(stringifyPushOrderShippingTags.value);
};

const updatePushSettingsHandler = async () => {
  const { id } = pushOrderShippingTags.value;
  let custom_shipping_tags = {};

  shippingTags.value.forEach(({ key, value }) => {
    Object.defineProperty(custom_shipping_tags, key, {
      enumerable: true,
      value: [value ?? ""],
      writable: true
    });
  });

  await updatePushSettings.value(custom_shipping_tags, id, true);
  isPushOrderShippingTagsChanged.value = false;
};
</script>

<template>
  <p class="line-height-3 mb-5 mt-1 px-3 text-lg">
    Convert shipping type into tags to be pushed to Source Stores. <AppLink label="Learn more" link="https://help.syncio.co/en/articles/5735293-order-add-on-custom-shipping-type-tags" />
  </p>

  <CardWrapper v-if="pushOrderShippingTags">
    <template #content>
      <ul class="list-none p-0 m-0">
        <li class="flex align-items-center pt-3">
          <h3 class="w-5">Shipping Type</h3>
          <h3 class="w-5">Tags Attached</h3>
          <h3 class="w-2"></h3>
        </li>

        <li v-for="tag in shippingTags" :key="tag.key" class="flex align-items-center py-3 border-top-1 surface-border">
          <div class="w-5">
            {{ tag.key }}
          </div>
          <div class="w-5">
            <template v-if="!tag.editMode">
              <Tag v-if="tag.value" severity="info" rounded style="margin: 5px 0;">{{ tag.value }}</Tag>
              <Tag v-else severity="info" rounded style="margin: 5px 0;">{{ tag.key }}</Tag>
            </template>
            <template v-else>
              <div class="relative w-50">
                <InputText class="w-100 pr-5 p-input-sm" placeholder="Enter Tag" v-model="tag.value" @keyup.enter="updateTag($event, tag)" />
                <i class="pi pi-times absolute pointer" style="right: .75rem; top: 1.1rem;" @click=editTagHandler(tag)></i>
              </div>
            </template>
          </div>

          <div class="w-2 text-right">
            <Button
              @click="editTagHandler(tag)"
              class="p-button-sm"
              label="Edit"
              outlined
              v-if="!tag.editMode">
            </Button>
            <Button
              @click="updateTag(tag)"
              class="p-button-sm"
              label="Update"
              outlined
              v-else>
            </Button>
          </div>
        </li>
      </ul>

      <Divider class="m-0" />

      <div class="flex justify-content-end pt-6">
        <Button @click="cancelHandler" label="Cancel" :disabled="!isPushOrderShippingTagsChanged" outlined></Button>
        <Button :loading="loadingSettings" label="Save" @click="updatePushSettingsHandler" :disabled="!isPushOrderShippingTagsChanged" class="ml-3"></Button>
      </div>
    </template>
  </CardWrapper>
</template>
