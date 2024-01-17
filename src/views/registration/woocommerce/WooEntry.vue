<!-- <script>
import { LOGIN_WOO } from "@/store/actions.type"
import { mapState } from "vuex"

export default {
  name: "WooEntry",
  computed: {
    ...mapState("shop", ["currentShop"]),
  },
  async created() {
    const store = this.$route.query.store
    const jwt = this.$route.query.jwt
    const res = await this.$store.dispatch(`auth/${LOGIN_WOO}`, { jwt, store })
    if (res.success === false) {
      return await this.$router.push('/session-expired')
    }

    return await this.$router.push('woocommerce/installation-completed')
  },
}
</script> -->

<script setup>
/* ----- Data ----- */
const loading = ref(false);
</script>

<template>
  <Loading />
</template>
