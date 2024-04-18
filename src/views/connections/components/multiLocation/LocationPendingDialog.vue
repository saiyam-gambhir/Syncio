<script setup>
import { useRouter } from 'vue-router';
import * as routes from '@/routes';

/* ----- Data ----- */
const products = useProductsStore();
const router = useRouter();

const {
  isLocationPendingDialogRequested,
} = toRefs(useConnectionsStore());

/* ----- Props ----- */
const props = defineProps({
  isRouterLink: {
    default: false,
    type: Boolean,
  },
});

/* ----- Methods ----- */
const closeDialogHandler = async () => {
  isLocationPendingDialogRequested.value = false;
};

const redirectToStoresView = async () => {
  await router.push({ name: routes.STORES });
  products.$reset();
};
</script>

<template>
  <DialogWrapper
    :isVisible="isLocationPendingDialogRequested"
    title=" Store connection pending"
    :closable="false"
    width="550px"
    @closeDialog="closeDialogHandler">
    <template #body>
      <section class="mt-1">
        <p class="m-0 text-left text-lg line-height-4">
          To continue syncing products, the Source store needs to assign a location to your store in their Syncio app. <br />
          Please contact the Source store to ensure they've assigned a location to your store.
        </p>
      </section>
    </template>

    <template #footer>
      <div class="flex justify-content-end">
        <Button v-if="isRouterLink" label="CLOSE" class="mr-1" outlined @click="redirectToStoresView"></Button>
        <Button v-else label="CLOSE" class="mr-1" outlined @click="closeDialogHandler"></Button>
      </div>
    </template>
  </DialogWrapper>
</template>
