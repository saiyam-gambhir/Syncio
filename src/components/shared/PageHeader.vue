<script setup>
import { useRouter } from 'vue-router'

/* ----- DATA ----- */
const router = useRouter()

/* ----- PROPS ----- */
const props = defineProps({
  content: {
    type: String
  },
  href: {
    type: String,
    required: false,
    default: ''
  },
  title: {
    type: String,
    required: true
  },
  withActions: {
    type: Boolean,
    default: false
  },
  withBackButton: {
    type: Boolean,
    default: false
  },
})

/* ----- METHODS ----- */
const backButtonHandler = () => {
  router.replace({ name: props.href })
}
</script>

<template>
  <div class="flex align-items-end justify-content-between border-bottom-1 surface-border pb-4">
    <section class="flex">
      <Button v-if="withBackButton" icon="pi pi-arrow-left" class="p-button-rounded p-button-secondary p-button-lg mr-3" @click="backButtonHandler"></Button>
      <div class="border-round-md page-header">
        <h1 class="text-5xl mb-0 ">{{ title }}</h1>
        <p v-if="content" class="mb-0 mt-1" v-html="content"></p>
      </div>
    </section>
    <section v-if="withActions" class="flex align-items-end justify-content-between">
      <slot name="actions"></slot>
    </section>
  </div>
</template>
