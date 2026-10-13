import AuthLayout from "@/domains/auth/components/layout/AuthLayout.vue";
import ForgotPasswordPage from "@/domains/auth/pages/forgot-password-page.vue";
import LoginPage from "@/domains/auth/pages/login-page.vue";
import RegisterPage from "@/domains/auth/pages/register-page.vue";
import ResetPasswordPage from "@/domains/auth/pages/reset-password-page.vue";
import VerifyEmailPage from "@/domains/auth/pages/verify-email-page.vue";
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
      path: "/admin",
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
    {
      path: "",
      name: "auth-layout",
      component: AuthLayout,
      children: [
        {
          path: "",
          redirect: { name: "login-page" },
        },
        {
          path: "login",
          component: LoginPage,
          name: "login-page",
        },
        {
          path: "register",
          component: RegisterPage,
          name: "register-page",
        },
        {
          path: "verify-email",
          component: VerifyEmailPage,
          name: "verify-email-page",
        },
        {
          path: "reset-password",
          component: ResetPasswordPage,
          name: "reset-password-page",
        },
        {
          path: "forgot-password",
          component: ForgotPasswordPage,
          name: "forgot-password-page",
        },
      ],
    },
  ],
});

export default router;
