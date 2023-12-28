<script setup>
import * as routes from '@/routes';

/* ----- Data ----- */
const {
  clickedStore,
  isLocationPendingDialogRequested,
} = toRefs(useConnectionsStore());

/* ----- Props ----- */
const props = defineProps({
  store: {
    required: true,
    type: Object,
  },

  isRouterLink: {
    default: false,
    type: Boolean,
  }
});

/* ----- Methods ----- */
const closeDialogHandler = async () => {
  isLocationPendingDialogRequested.value = false;
};
</script>

<template>
  <DialogWrapper
    :isVisible="isLocationPendingDialogRequested"
    title=" Store connection is pending"
    :closable="false"
    width="550px"
    @closeDialog="closeDialogHandler">
    <template #body>
      <section class="mt-1">
        <p class="m-0 text-center text-lg line-height-4">There is no location assigned to <span class="font-semi">{{ store?.store_domain }}</span>.</p>
        <p class="m-0 text-center text-lg line-height-4">To continue syncing products, please assign a location to this Source Store.</p>
      </section>
    </template>

    <template #footer>
      <div class="flex justify-content-end">
        <router-link v-if="isRouterLink" :to="routes.STORES" class="btn-primary">
          <Button label="Assign Location" class="mr-1"></Button>
        </router-link>
        <Button v-else label="Assign Location" class="mr-1" @click="closeDialogHandler"></Button>
      </div>
    </template>
  </DialogWrapper>
</template>
