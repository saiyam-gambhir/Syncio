<script setup>
import Card from '@/views/dashboard/components/Card.vue'
</script>

<template>
  <Card>
    <template #links>
      <Skeleton height="25px" width="150px" class="mb-3" />
      <div class="py-3 border-top-1 surface-border">
        <Skeleton height="15px" width="250px" />
      </div>
      <div class="py-3 border-top-1 surface-border">
        <Skeleton height="15px" width="300px" />
      </div>
      <div class="py-3 border-top-1 surface-border">
        <Skeleton height="15px" width="250px" />
      </div>
      <div class="py-3 border-bottom-1 border-top-1 surface-border">
        <Skeleton height="15px" width="450px" />
      </div>
    </template>
  </Card>

  <Card class="mt-5">
    <template #links>
      <Skeleton height="25px" width="150px" class="mb-3" />
      <div class="py-3 border-top-1 surface-border">
        <Skeleton height="15px" width="250px" />
      </div>
      <div class="py-3 border-top-1 surface-border">
        <Skeleton height="15px" width="300px" />
      </div>
      <div class="py-3 border-top-1 surface-border">
        <Skeleton height="15px" width="250px" />
      </div>
      <div class="py-3 border-top-1 surface-border">
        <Skeleton height="15px" width="450px" />
      </div>
      <div class="pt-4 surface-border">
        <Skeleton height="15px" width="85px" class="mx-auto" />
      </div>
    </template>
  </Card>

  <Card class="mt-5">
    <template #links>
      <Skeleton height="25px" width="150px" class="mb-3" />
      <div class="py-3 border-top-1 surface-border">
        <Skeleton height="15px" width="250px" />
      </div>
      <div class="py-3 border-top-1 surface-border">
        <Skeleton height="15px" width="300px" />
      </div>
      <div class="pt-4 surface-border">
        <Skeleton height="15px" width="125px" class="mx-auto" />
      </div>
    </template>
  </Card>
</template>