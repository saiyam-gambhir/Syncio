<template>
  <div class="min-h-screen flex relative lg:static surface-ground">
    <section class="auth flex align-items-center justify-content-center w-full login-screen">
      <LogoDark class="logo" />
      <div class="grid auth-container">
        <div class="col-12 auth-right border-round">
          <RouterView />
        </div>
      </div>
    </section>
  </div>
</template>
