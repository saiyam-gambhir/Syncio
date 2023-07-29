<script setup>
import { useConnectionsStore } from '@/stores/connections';
import { useRouter } from 'vue-router';

/* ----- Data ----- */
const { storeName, storeType } = useConnectionsStore();
const router = useRouter();

/* ----- Methods ----- */
const goBackHandler = () => {
  const { history } = window;
  if (!history.state.back) return;
  window.history.length > 1 ? router.back() : router.go('/');
};
</script>

<template>
  <header class="header-height surface-section border-bottom-1 surface-border flex align-items-center justify-content-between px-5">
    <div class="header-left">
      <Button
        icon="pi pi-arrow-left"
        iconPos="left"
        outlined
        raised @click="goBackHandler"
        v-tooltip.right="'Back'">
      </Button>
    </div>
    <div class="header-right flex align-items-center">
      <Tag
        :value="`${storeType} store`"
        :class="storeType"
        v-tooltip.left="storeName">
      </Tag>
      <Button
        class="ml-4"
        icon="pi pi-user"
        outlined
        rounded>
      </Button>
    </div>
  </header>
</template>
