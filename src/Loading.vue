<script setup>
import Logo from '@/icons/Logo.vue';
</script>

<template>
  <section class="loading-page flex align-items-center justify-content-center">
    <Logo />
  </section>
</template>

<style lang="scss" scoped>
.loading-page {
  height: 100vh;
  background: linear-gradient(90deg,rgba(252, 176, 87, 0.4) 33.33%,rgba(250, 117, 123, 0.4) 66.66%);

  svg {
    animation: logo 0.75s infinite alternate;
    width: 40rem !important;
  }
}

@keyframes logo {
  0% {
    opacity: 0.75;
    scale: 0.9;
    filter: brightness(3);
  }

  100% {
    opacity: 1;
    scale: 1;
    filter: brightness(1);
  }
}
</style>
