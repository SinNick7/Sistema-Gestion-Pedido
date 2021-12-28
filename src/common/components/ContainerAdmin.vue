<template>
  <v-card>
    <NavAdmin style="height:80px"></NavAdmin>
    <v-container style="margin-top:100px">
      <router-view></router-view>
    </v-container>
  </v-card>
</template>

<script>
import NavAdmin from "./NavAdmin.vue";

export default {
  components: {
    NavAdmin,
  },
};
</script>

<style></style>
