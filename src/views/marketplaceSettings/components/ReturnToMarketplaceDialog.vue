<script setup>
import * as routes from '@/routes';

/* ----- Data ----- */
const router = useRouter();

const {
  isReturnToMarketplaceDialogVisible,
  selectedProfile,
} = toRefs(useMarketPlaceStore());

/* ----- Methods ----- */
const closeDialogHandler = () => {
  isProfileCreatedDialogVisible.value = false;
};

const goToMarketplacePageHandler = async () => {
  await router.push({ name: routes.MARKETPLACE, query: { 'show-invite-dialog': true } });
  isReturnToMarketplaceDialogVisible.value = false;
};
</script>

<template>
  <DialogWrapper :isVisible="isReturnToMarketplaceDialogVisible" @closeDialog="closeDialogHandler" title="" withoutTitle width="600px" :showFooter="true">
    <template #body>
      <div class="text-center">
        <h2 class="line-height-3 m-0 text-2xl">
          <span style="font-size: 3rem;" class="block my-3">🎉</span>
          Your profile was created!
        </h2>

        <p class="text-xl line-height-3 mb-4">You'll now be visible to other stores, so they can reach out and <br> invite you to work together.</p>
        <p class="text-xl line-height-3 mb-4">Let's take you back to complete your invite for <br> <span class="font-semi">{{ selectedProfile?.brand_name }}</span></p>
      </div>
    </template>
    <template #footer>
      <div class="text-right">
        <Button label="Return to Marketplace" class="mr-0" @click="goToMarketplacePageHandler"></Button>
      </div>
    </template>
  </DialogWrapper>
</template>
