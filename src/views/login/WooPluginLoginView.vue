<script setup>
import * as routes from '@/routes';
import router from '@/router';
import { onMounted } from 'vue';
import { useRoute } from 'vue-router';


const {
	wooPluginLogin,
} = toRefs(useAuthStore());

const route = useRoute();

onMounted(async () => {
	const token = route.query?.token;
	if (!token) {
		router.push({ name: routes.LOGIN});
	}
	const params = {
		syncio_access_token: token,
	}
	await wooPluginLogin.value(params);
})
</script>

<template>

</template>