<template>
  <!-- 1. Show your THREADLY loading state while checking credentials -->
  <div
    v-if="isPending"
    class="h-[70vh] w-full flex flex-col items-center justify-center bg-zinc-50 font-sans"
  >
    <LoaderCircle class="text-4xl text-[#d99a4a] animate-spin mb-4" />
    <p class="text-sm font-medium text-zinc-500 animate-pulse">
      Verifying credentials...
    </p>
  </div>
  <!-- 2. Prevent rendering protected content while the redirect is happening -->
  <template v-else-if="!user"></template>
  <!-- 3. Render the secure page if authenticated -->
  <slot v-else></slot>
</template>

<script setup lang="ts">
import { computed, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import { LoaderCircle } from "lucide-vue-next";
import { useGetMe } from "@/domains/users/hooks/useUser";

const router = useRouter();
const route = useRoute();

const { data: user, isPending } = useGetMe();
const currentUser = computed(() => user.value?.data);

watch([isPending, currentUser, () => route.path], () => {
  // If the query has finished loading and there is no user, redirect to login.
  if (!isPending.value && !currentUser.value) {
    // We pass the current pathname as a redirect URL so they can come right back after logging in
    router.push(`/login?redirect=${encodeURIComponent(route.path)}`);
  }
});
</script>

<style scoped></style>
