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
        {
          path: "stores/:slug",
          name: "store",
          component: () =>
            import("@/domains/storefront/pages/StorefrontPage.vue"),
        },
        {
          path: "cart",
          name: "cart",
          component: () => import("@/domains/cart/pages/CartPage.vue"),
        },
        {
          path: "checkout",
          name: "checkout",
          component: () => import("@/domains/orders/pages/CheckoutPage.vue"),
        },
        {
          path: "orders/:id/confirmation",
          name: "order-confirmation",
          component: () =>
            import("@/domains/orders/pages/OrderConfirmationPage.vue"),
        },
        {
          path: "account",
          component: () =>
            import("@/domains/users/components/layout/AccountLayout.vue"),
          children: [
            {
              path: "",
              name: "account-profile",
              component: () =>
                import("@/domains/users/pages/AccountProfilePage.vue"),
            },
            {
              path: "addresses",
              name: "account-addresses",
              component: () =>
                import("@/domains/users/pages/AccountAddressesPage.vue"),
            },
            {
              path: "security",
              name: "account-security",
              component: () =>
                import("@/domains/users/pages/AccountSecurityPage.vue"),
            },
            {
              path: "orders",
              name: "account-orders",
              component: () =>
                import("@/domains/orders/pages/AccountOrdersPage.vue"),
            },
            {
              path: "orders/:id",
              name: "account-order-detail",
              component: () =>
                import("@/domains/orders/pages/AccountOrderDetailPage.vue"),
              props: true,
            },
            {
              path: "reviews/pending",
              name: "account-pending-reviews",
              component: () =>
                import(
                  "@/domains/reviews/pages/AccountPendingReviewsPage.vue"
                ),
            },
            {
              path: "reviews/write/:orderItemId",
              name: "account-write-review",
              component: () =>
                import("@/domains/reviews/pages/AccountWriteReviewPage.vue"),
              props: true,
            },
          ],
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
          component: () =>
            import("@/domains/sellers/pages/SellerDashboardPage.vue"),
        },
        {
          path: "onboarding",
          name: "seller-onboarding",
          component: () =>
            import("@/domains/sellers/pages/SellerOnboardingPage.vue"),
        },
        {
          path: "pending-approval",
          name: "seller-pending-approval",
          component: () =>
            import("@/domains/sellers/pages/SellerPendingApprovalPage.vue"),
        },
        {
          path: "profile",
          name: "seller-profile",
          component: () =>
            import("@/domains/sellers/pages/SellerProfilePage.vue"),
        },
        {
          path: "products",
          name: "seller-products",
          component: () =>
            import("@/domains/products/pages/SellerProductsPage.vue"),
        },
        {
          path: "products/create",
          name: "seller-product-create",
          component: () =>
            import("@/domains/products/pages/SellerCreateProductPage.vue"),
        },
        {
          path: "products/:id/edit",
          name: "seller-product-edit",
          component: () =>
            import("@/domains/products/pages/SellerEditProductPage.vue"),
          props: true,
        },
        {
          path: "products/:id",
          name: "seller-product-detail",
          component: () =>
            import("@/domains/products/pages/SellerProductDetailPage.vue"),
          props: true,
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
