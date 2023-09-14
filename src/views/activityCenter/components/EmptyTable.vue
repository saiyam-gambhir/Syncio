<script>
import * as routes from '@/routes';
</script>

<template>
  <div class="px2 py-5 text-center">
    <p class="font-semibold text-xl mt-0">You have no logs to review at this time.</p>
    <p class="text-lg">Syncio will record important events and logs here.</p>
    <p class="text-lg">You can set up email alerts for important updates in <router-link :to="routes.NOTIFICATION_SETTINGS" class="btn-link text-lg">Notification Settings</router-link>.</p>
    <p class="mb-0">
      <AppLink label="Learn more about the Activity Center" link="https://help.syncio.co/en/articles/5596711-activity-center" class="text-lg" />
    </p>
  </div>
</template>
