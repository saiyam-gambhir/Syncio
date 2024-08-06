<script setup>
import * as routes from '@/routes';

/* ----- Data ----- */
const router = useRouter();

const {
  isProfileCreatedDialogVisible,
} = toRefs(useMarketPlaceStore());

/* ----- Methods ----- */
const closeDialogHandler = () => {
  isProfileCreatedDialogVisible.value = false;
};

const goToMarketplacePageHandler = async () => {
  await router.push({ name: routes.MARKETPLACE });
  isProfileCreatedDialogVisible.value = false;
};
</script>

<template>
  <DialogWrapper :isVisible="isProfileCreatedDialogVisible" @closeDialog="closeDialogHandler" title="" withoutTitle width="600px" :showFooter="true">
    <template #body>
      <div class="text-center">
        <h2 class="line-height-3 m-0 text-2xl">
          <span style="font-size: 3rem;" class="block my-3">🎉</span>
          Marketplace profile created successfully!
        </h2>

        <p class="text-xl line-height-3 mb-4">Connect with like-minded stores to share <br> inventory and boost sales.</p>
      </div>
    </template>
    <template #footer>
      <div class="text-right">
        <Button label="Explore Marketplace" class="mr-0" @click="goToMarketplacePageHandler"></Button>
      </div>
    </template>
  </DialogWrapper>
</template>
