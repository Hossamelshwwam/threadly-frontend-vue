import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      component: () =>
        import("@/domains/storefront/layout/StoreFrontLayout.vue"),
      children: [
        {
          path: "",
          name: "home",
          component: () => import("@/domains/storefront/pages/HomePage.vue"),
        },
        {
          path: "products",
          name: "products",
          component: () => import("@/domains/products/pages/ProductsPage.vue"),
        },
        {
          path: "products/:slug",
          name: "product-detail",
          component: () =>
            import("@/domains/products/pages/ProductDetailPage.vue"),
        },
      ],
    },
    {
      path: "/seller",
      component: () => import("@/domains/sellers/layout/SellerLayout.vue"),
      children: [
        {
          path: "",
          name: "seller-home",
          // placeholder: replace with a real seller dashboard page
          component: () => import("@/domains/storefront/pages/HomePage.vue"),
        },
      ],
    },
    {
      path: "/admin",
      component: () => import("@/shared/components/admin/AdminLayout.vue"),
      children: [
        {
          path: "",
          name: "admin-home",
          // placeholder: replace with a real admin dashboard page
          component: () => import("@/domains/storefront/pages/HomePage.vue"),
        },
      ],
    },
    {
      path: "/",
      component: () =>
        import("@/domains/auth/components/layout/AuthLayout.vue"),
      children: [
        {
          path: "login",
          name: "login-page",
          component: () => import("@/domains/auth/pages/login-page.vue"),
        },
        {
          path: "register",
          name: "register-page",
          component: () => import("@/domains/auth/pages/register-page.vue"),
        },
        {
          path: "verify-email",
          name: "verify-email-page",
          component: () => import("@/domains/auth/pages/verify-email-page.vue"),
        },
        {
          path: "reset-password",
          name: "reset-password-page",
          component: () =>
            import("@/domains/auth/pages/reset-password-page.vue"),
        },
        {
          path: "forgot-password",
          name: "forgot-password-page",
          component: () =>
            import("@/domains/auth/pages/forgot-password-page.vue"),
        },
      ],
    },
  ],
});

export default router;
