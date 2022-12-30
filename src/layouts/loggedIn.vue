<script setup>
import Header from '@/components/header/Header.vue'
import Navbar from '@/components/navbar/Navbar.vue'
</script>

<template>
  <main class="main">
    <div class="min-h-screen flex relative lg:static surface-ground">
      <Navbar />

      <div class="min-h-screen flex flex-column relative flex-auto">
        <Header />

        <div class="flex flex-auto flex-column router-view mx-auto">
          <div class="flex-auto surface-section p-5">
            <RouterView />
          </div>
        </div>
      </div>
    </div>
  </main>
</template>
