import Vue from "vue";
import VueRouter from "vue-router";

import ContainerAdmin from "../common/components/ContainerAdmin.vue";
import Orders from "../views/Orders.vue";
import Products from "../views/Products.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "",
    name: "container",
    component: ContainerAdmin,
    children: [      
      {
        path: "orders",
        name: "orders",
        component: Orders,
      },  
      {
        path: "products",
        name: "products",
        component: Products,
      },
    ],
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
