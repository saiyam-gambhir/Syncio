<template>
  <div v-for="item in 16" class="profile col-3" :key="item">
    <Skeleton width="288px" height="224px" borderRadius="8px"></Skeleton>
    <div class="p-3">
      <Skeleton class="mt-2" width="100%" height="24px" borderRadius="0"></Skeleton>
      <Skeleton class="mt-2" width="65%" height="24px" borderRadius="0"></Skeleton>
      <Skeleton class="mt-2" width="30%" height="24px" borderRadius="0"></Skeleton>
    </div>
  </div>
</template>
