<template>
  <main class="grow flex items-center justify-center px-4 py-16">
    <div class="w-full max-w-[400px] flex flex-col items-center">
      <AuthPageHeader
        title="Welcome back"
        subtitle="Please enter your details to sign in."
      />

      <AuthCard>
        <LoginForm />

        <div class="flex justify-end mt-2">
          <RouterLink
            to="/forgot-password"
            class="text-sm text-zinc-500 hover:text-amber-600 hover:underline transition-all"
          >
            Forgot password?
          </RouterLink>
        </div>
      </AuthCard>

      <AuthRedirectLink href="/register">
        Don&apos;t have an account?
      </AuthRedirectLink>
    </div>
  </main>
</template>

<script setup lang="ts">
import AuthCard from "../components/layout/AuthCard.vue";
import AuthPageHeader from "../components/layout/AuthPageHeader.vue";
import AuthRedirectLink from "../components/layout/AuthRedirectLink.vue";
import LoginForm from "../components/login/LoginForm.vue";
</script>

<style scoped></style>
