<template>
  <v-app-bar
    fixed
    color="#fcb69f"
    dark
    shrink-on-scroll
    src="https://picsum.photos/1920/1080?random"
    scroll-target="#scrolling-techniques-2"
  >
    <template v-slot:img="{ props }">
      <v-img
        v-bind="props"
        gradient="to top right, rgba(19,84,122,.5), rgba(128,208,199,.8)"
      ></v-img>
    </template>

    <div class="logo">Sistema Gestion Pedido</div>

    <v-spacer></v-spacer>

    <div class="item-nav" @click="redirect('/orders')">
      Orders
    </div>
    <div class="item-nav" @click="redirect('/products')">
      Products
    </div>

  </v-app-bar>
</template>

<script>
export default {
  methods: {
    redirect(url) {
      this.$router.push(url).catch(() => {});
    },
  },
};
</script>

<style scoped>
.item-nav {
  font-size: 20px;
  margin-left: 20px;
  padding-top: 10px;
  text-transform: uppercase;
  cursor: pointer;
}

.logo {
  font-size: 30px;
  font-weight: bold;
  text-transform: uppercase;
}
</style>
