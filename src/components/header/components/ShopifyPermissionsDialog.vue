<script setup>
/* ----- Data ----- */
const {
  shopifyPermissions,
} = toRefs(useConnectionsStore());

/* ----- Methods ----- */
const reviewPermissionsHandler = () => {
  window.location.href = shopifyPermissions.value.link;
};
</script>

<template>
  <DialogWrapper :isVisible="shopifyPermissions.showDialog" title="Review and approve permissions" width="500px" :closable="false">
    <template #body>
      <p class="text-xl m-0 pb-3 line-height-3">
        We've made some improvements to the Syncio app, which require your permissions approval in <strong>Shopify</strong>.
      </p>
      <p class="text-xl m-0 line-height-3">
        To continue getting the best in app experience and performance, review and approve these updates.
      </p>
    </template>

    <template #footer>
      <div class="flex align-items-center justify-content-end">
        <Button label="Review permissions" class="mr-0" @click="reviewPermissionsHandler"></Button>
      </div>
    </template>
  </DialogWrapper>
</template>
