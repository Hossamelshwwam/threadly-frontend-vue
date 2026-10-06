<template>
  <div
    v-if="isPending"
    class="h-screen w-full flex flex-col items-center justify-center bg-zinc-50 font-sans"
  >
    <LoaderCircle class="text-4xl text-[#d99a4a] animate-spin mb-4" />
    <p class="text-sm font-medium text-zinc-500 animate-pulse">
      Verifying administrator privileges...
    </p>
  </div>
  <template v-else-if="!user"></template>
  <div
    v-else-if="!isAdmin"
    class="h-screen w-full flex items-center justify-center bg-zinc-50 p-4 font-sans"
  >
    <div
      class="max-w-md w-full bg-white border border-zinc-200 rounded-2xl p-8 shadow-sm text-center space-y-6 animate-in fade-in zoom-in-95 duration-200"
    >
      <div
        class="w-14 h-14 bg-red-50 text-red-600 rounded-xl flex items-center justify-center mx-auto shadow-sm border border-red-100"
      >
        <CircleX :size="28" />
      </div>
      <div class="space-y-2">
        <h2 class="text-xl font-black text-zinc-900 tracking-tight">
          Admin Access Restricted
        </h2>
        <p class="text-sm text-zinc-500 leading-relaxed">
          You are currently logged in as
          <span class="font-bold text-zinc-800">{{ user.email }}</span
          >, which does not have administrator privileges.
        </p>
      </div>

      <p class="text-xs text-zinc-400 leading-relaxed pb-2">
        If you believe you should have access to this dashboard, please contact
        the system owner.
      </p>
      <CustomButton
        variant="solid"
        theme="neutral"
        :left-icon="Home"
        @click="router.push('/')"
        full-width
        class="h-12"
      >
        Return to Homepage
      </CustomButton>
    </div>
  </div>
  <slot v-else />
</template>

<script setup lang="ts">
import { useGetMe } from "@/domains/users/hooks/useUser";
import { computed, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import CustomButton from "../custom-button/CustomButton.vue";
import { CircleX, Home, LoaderCircle } from "lucide-vue-next";

const router = useRouter();
const route = useRoute();

const { data, isPending } = useGetMe();
const user = computed(() => data.value?.data);
const isAdmin = computed(() => user.value?.role === "admin");

watch([isPending, user, () => route.path], () => {
  if (!isPending.value && !user.value) {
    router.push(`/login?redirect=${encodeURIComponent(route.path)}`);
  }
});
</script>

<style scoped></style>
