<template>
  <main class="grow flex items-center justify-center px-4 py-16">
    <div class="w-full max-w-[400px] flex flex-col items-center">
      <AuthPageHeader
        title="Join Threadly"
        subtitle="Create your account to start curating your style."
      />

      <AuthCard>
        <RegisterForm />
      </AuthCard>

      <AuthRedirectLink href="/login">
        Already have an account?
      </AuthRedirectLink>
    </div>
  </main>
</template>

<script setup lang="ts">
import AuthCard from "../components/layout/AuthCard.vue";
import AuthPageHeader from "../components/layout/AuthPageHeader.vue";
import AuthRedirectLink from "../components/layout/AuthRedirectLink.vue";
import RegisterForm from "../components/register/RegisterForm.vue";
</script>

<style scoped></style>
