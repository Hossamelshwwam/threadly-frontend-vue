<template>
  <main class="grow flex items-center justify-center px-4 py-16">
    <div class="w-full max-w-[400px] flex flex-col items-center">
      <AuthPageHeader
        title="Reset password"
        subtitle="Please enter a new password for your account."
        :icon="Lock"
      />

      <AuthCard>
        <ResetPasswordForm />
        <AuthBackLink />
      </AuthCard>
    </div>
  </main>
</template>

<script setup lang="ts">
import { Lock } from "lucide-vue-next";
import AuthPageHeader from "../components/layout/AuthPageHeader.vue";
import AuthCard from "../components/layout/AuthCard.vue";
import ResetPasswordForm from "../components/reset-password/ResetPasswordForm.vue";
import AuthBackLink from "../components/layout/AuthBackLink.vue";
</script>

<style scoped></style>
