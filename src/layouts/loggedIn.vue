<script setup>
import Header from '@/components/header/Header.vue'
import Navbar from '@/components/navbar/Navbar.vue'
</script>

<template>
  <main class="main">
    <Toast position="top-center" successIcon="pi pi-check-circle" />
    <div class="min-h-screen flex relative lg:static">
      <Navbar />

      <div class="min-h-screen flex flex-column relative flex-auto">
        <Header />

        <div class="flex flex-auto flex-column router-view mx-auto">
          <div class="flex-auto surface-section p-5 pt-4">
            <RouterView />
          </div>
        </div>
      </div>
    </div>
  </main>
</template>
