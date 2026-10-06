import SellerLayout from "@/domains/sellers/layout/SellerLayout.vue";
import StoreFrontLayout from "@/domains/storefront/layout/StoreFrontLayout.vue";
import HomePage from "@/domains/storefront/pages/HomePage.vue";
import AdminLayout from "@/shared/components/admin/AdminLayout.vue";
import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "store-front",
      component: StoreFrontLayout,
      children: [
        {
          path: "",
          component: HomePage,
          name: "home",
        },
      ],
    },
    {
      path: "/seller",
      name: "seller-layout",
      component: SellerLayout,
      children: [
        {
          path: "",
          component: HomePage,
          name: "home",
        },
      ],
    },
    {
      path: "/seller",
      name: "admin-layout",
      component: AdminLayout,
      children: [
        {
          path: "",
          component: HomePage,
          name: "home",
        },
      ],
    },
  ],
});

export default router;
