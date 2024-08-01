<script setup>
import * as routes from '@/routes';
import router from '@/router';

/* ----- Data ----- */
const route = useRoute();

/* ----- OnMounted ----- */
onMounted(async () => {
});
</script>

<template>
  <section class="mx-auto" style="width: 1000px; max-width: 100%;">
    <PageDetails title="Installation Complete!" content="Here are a few guides to help you Sync your first product!" />

    <aside class="auth-wrapper text-900 text-center">
      <div class="grid mb-4">
      </div>
    </aside>
  </section>
</template>
