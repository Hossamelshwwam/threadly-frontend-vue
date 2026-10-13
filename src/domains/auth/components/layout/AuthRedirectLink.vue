<template>
  <p class="mt-8 text-sm text-zinc-500">
    <slot />
    <RouterLink
      :to="href"
      class="text-amber-600 font-semibold hover:text-amber-700 hover:underline transition-all"
    >
      {{ href === "/login" ? "Sign in" : "Sign up" }}
    </RouterLink>
  </p>
</template>

<script setup lang="ts">
interface AuthRedirectLinkProps {
  href: string;
}

defineProps<AuthRedirectLinkProps>();
</script>

<style scoped></style>
