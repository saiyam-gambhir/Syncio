<script setup>
const props = defineProps({
  isVisible: {
    type: Boolean,
    default: false
  },

  title: {
    type: String,
    default: ''
  },

  width: {
    type: String,
    default: '600px'
  }
})

const emits = defineEmits(['hideDialog'])

const hideDialogHandler = () => {
  emits('hideDialog')
}
</script>

<template>
  <Dialog v-model:visible="isVisible" :modal="true" :style="{ width: width }" :dismissableMask="true" @after-hide="hideDialogHandler">
    <template #header>
      <h2 class="m-0">{{ title }}</h2>
    </template>

    <slot name="body"></slot>

    <template #footer>
      <slot name="footer"></slot>
    </template>
  </Dialog>
</template>
