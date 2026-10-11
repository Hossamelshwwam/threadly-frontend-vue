<template>
  <Avatar :class="class">
    <AvatarImage :src="img || ''" :alt="fallback" />
    <AvatarFallback
      :class="
        cn([
          'bg-main text-white border-2 border-main-warm',
          loading && 'animate-spin',
          fallbackClass,
        ])
      "
    >
      <span
        v-if="loading"
        class="w-4 h-4 rounded-full border-2 border-main-subtle/30 border-t-main-subtle animate-spin"
      ></span>
      {{ (!loading && fallback) ?? "U" }}
    </AvatarFallback>
  </Avatar>
</template>

<script setup lang="ts">
import { cn } from "@/shared/lib/utils/index.ts";
import Avatar from "../ui/avatar/Avatar.vue";
import AvatarFallback from "../ui/avatar/AvatarFallback.vue";
import AvatarImage from "../ui/avatar/AvatarImage.vue";

interface CustomAvatarProps {
  fallback?: string;
  img?: string;
  loading?: boolean;
  class?: string;
  fallbackClass?: string;
}
defineProps<CustomAvatarProps>();
</script>

<style scoped></style>
