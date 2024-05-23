<template>
  <section class="absolute align-items-center flex h-100 justify-content-center left-0 switch-loading top-0 w-100 z-5">
    <div class="loading-container p-2 align-items-center flex justify-content-center flex-column pt-5">
      <img src="@/assets/images/logo-small.png" alt="Syncio logo" class="logo-sm" />
      <h2 class="mt-3 mb-0 font-semi">Loading Store</h2>
      <p class="text-700 text-lg mb-6">Usually takes a few seconds...</p>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.switch-loading {
  background: rgba(14, 59, 77, .6);

  .logo-sm {
    -webkit-animation: beat .35s infinite alternate;
    animation: beat .35s infinite alternate;
  }
}

.loading-container {
  background: var(--white);
  border-radius: var(--border-radius);
  min-width: 30rem;
  min-height: 15rem;
}

.logo-sm {
  width: 6rem;
}

@keyframes beat {
  from {
    -webkit-transform: scale(.9);
  }
  to {
    -webkit-transform: scale(1);
  }
}
</style>
