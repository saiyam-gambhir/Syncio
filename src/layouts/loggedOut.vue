<template>
  <Toast position="top-right" successIcon="pi pi-check-circle" />
  <div class="min-h-screen flex relative lg:static surface-ground">
    <section class="auth flex align-items-center justify-content-center w-full login-screen">
      <router-link to="/">
        <LogoDark class="logo" />
      </router-link>

      <div class="grid auth-container">
        <div class="col-12 border-round">
          <RouterView />
        </div>
      </div>
    </section>
  </div>
</template>
