<script setup>
import { useMarketPlaceStore } from 'marketPlace';

/* ----- Data ----- */
const {
  isMessageSentDialogVisible,
  selectedProfile,
} = toRefs(useMarketPlaceStore());

/* ----- Methods ----- */
const closeDialogHandler = () => {
  isMessageSentDialogVisible.value = false;
};
</script>

<template>
  <DialogWrapper :isVisible="isMessageSentDialogVisible" width="506px" @closeDialog="closeDialogHandler" withoutTitle>
    <template #body>
      <section class="grid flex-column align-items-center text-center mt-1 px-3">
        <IconMessageSent />
        <h3 class="mt-5">
          Invitation sent to {{ selectedProfile?.brand_name }}
        </h3>
        <p class="mb-0">If you decide to work together, share your Syncio store keys and connect via the <strong class="font-semibold">Connect New Store</strong> button on the <strong font-semibold>Stores page</strong>.</p>
        <p class="mb-0">You'll be able to share inventory as soon as the connection is made.</p>
      </section>
    </template>

    <template #footer>
      <div class="flex justify-content-end">
        <Button label="Close" class="mr-0" outlined @click="closeDialogHandler"></Button>
      </div>
    </template>
  </DialogWrapper>
</template>
