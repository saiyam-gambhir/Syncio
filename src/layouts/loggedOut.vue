<script setup>
import { computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'

/* ===== COMPONENTS ===== */
import Logo from '@/icons/Logo.vue'
</script>

<template>
  <div class="min-h-screen flex relative lg:static surface-ground">
    <section class="auth flex align-items-center justify-content-center w-full login-screen">
      <Logo class="logo" />
      <div class="grid auth-container">
        <div class="col-12 auth-right border-round">
          <RouterView />
        </div>
      </div>
    </section>
  </div>
</template>
