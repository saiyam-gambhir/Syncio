<script setup>
/* ----- Data ----- */
const {
  customStoreName,
  isDestinationStore,
  isEnableUniversalStoreRequested,
  isSourceStore,
  storeName,
  storeType,
} = toRefs(useConnectionsStore());

const {
  copyToClipBoard,
} = useFilters();

const {
  showToast,
} = useToasts();

/* ----- Methods ----- */
const copyStoreNameHandler = async val => {
  await copyToClipBoard(val);
  showToast({ message: 'Store URL copied successfully' });
};
</script>

<template>
  <Tag v-if="customStoreName" severity="info" class="text-900 border-0 tag-transparent" :class="`tag-${storeType}`">
    <div class="flex flex-column pr-6">
      <h4 class="m-0 font-semiBold" style="transform: translateY(2px);">{{ customStoreName }}</h4>
      <p class="flex align-items-center m-0 font-normal" style="font-size: .9rem;">
        {{ storeName }}
        <i class="pi pi-copy pointer ml-1" @click="copyStoreNameHandler(storeName)"></i>
      </p>
    </div>
  </Tag>

  <Tag v-else severity="info" class="pointer border-0 text-900 tag-transparent" :class="`tag-${storeType}`">
    <div class="flex align-items-center pr-6">
      {{ storeName }}
      <i class="pi pi-copy pointer ml-2" @click="copyStoreNameHandler(storeName)"></i>
    </div>
  </Tag>
  <div class="flex" v-if="isDestinationStore">
    <Button
      @click="isEnableUniversalStoreRequested = true"
      class="text-900 font-normal"
      icon="pi pi-plus-circle"
      label="Enable Source"
      outlined>
    </Button>

    <Divider layout="vertical" class="mx-3" />

    <Button
      class="p-button-destination active"
      label="Destination"
      outlined>
    </Button>
  </div>
  <div class="flex" v-else-if="isSourceStore">
    <Button
      class="p-button-source active"
      label="Source"
      outlined>
    </Button>

    <Divider layout="vertical" class="mx-3" />

    <Button
      @click="isEnableUniversalStoreRequested = true"
      class="text-900 font-normal"
      icon="pi pi-plus-circle"
      label="Enable Destination"
      outlined>
    </Button>
  </div>
</template>

<style scoped>
.pi-copy:before {
  font-size: 1rem !important;
}
</style>
