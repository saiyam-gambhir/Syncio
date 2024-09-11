<template>
  <section class="loading-page flex align-items-center justify-content-center">
    <LogoDark />
  </section>
</template>

<style lang="scss" scoped>
.loading-page {
  height: 100vh;
  background: #0e3b4d;

  svg {
    animation: logo .4s infinite alternate;
    width: 32rem !important;

    @media screen and (max-width: 1023px) {
      width: 20rem !important;
    }
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
