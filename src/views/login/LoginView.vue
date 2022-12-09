<script setup>
import Card from '@/components/ui/Card.vue'
import Input from '@/components/ui/Input.vue'
import { useAuthStore } from '@/stores/auth'

/* ===== DATA ===== */
const auth = useAuthStore();

/* ===== METHODS ===== */
const loginHandler = () => {
  auth.login({
    email: auth.email,
    password: auth.password
  })
}
</script>

<template>
  <section class="login page">
    <Card>
      <h3 class="text-center">Staff Login</h3>
      <div class="input-group">
        <Input placeholder="Email" v-model="auth.email" />
      </div>
      <div class="input-group">
        <Input type="password" placeholder="Password" v-model="auth.password" />
      </div>
      <div class="input-group">
        <button class="btn btn-action btn-inverse btn-inverse w-100" @click="loginHandler">Login</button>
      </div>
    </Card>
  </section>
</template>
