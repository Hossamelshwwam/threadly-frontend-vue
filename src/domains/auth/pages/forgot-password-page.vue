<template>
  <main class="grow flex items-center justify-center px-4 py-16">
    <div class="w-full max-w-[400px] flex flex-col items-center">
      <AuthPageHeader
        title="Reset your password"
        subtitle="Enter the email associated with your account and we'll send a secure reset link."
        :icon="Mail"
      />

      <AuthCard>
        <ForgotPasswordForm />
        <AuthBackLink />
      </AuthCard>
    </div>
  </main>
</template>

<script setup lang="ts">
import { Mail } from "lucide-vue-next";
import AuthCard from "../components/layout/AuthCard.vue";
import AuthPageHeader from "../components/layout/AuthPageHeader.vue";
import AuthBackLink from "../components/layout/AuthBackLink.vue";
import ForgotPasswordForm from "../components/forgot-password/ForgotPasswordForm.vue";
</script>

<style scoped></style>
