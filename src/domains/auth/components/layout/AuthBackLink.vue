<template>
  <div class="mt-6 pt-6 border-t border-zinc-200 flex justify-center">
    <RouterLink
      :to="href"
      class="inline-flex items-center gap-1.5 text-sm text-zinc-500 hover:text-amber-600 transition-colors"
    >
      <ArrowLeft :size="14" />
      {{ label }}
    </RouterLink>
  </div>
</template>

<script setup lang="ts">
import { ArrowLeft } from "lucide-vue-next";

interface AuthBackLinkProps {
  href?: string;
  label?: string;
}

withDefaults(defineProps<AuthBackLinkProps>(), {
  href: "/login",
  label: "Back to Login",
});
</script>

<style scoped></style>
