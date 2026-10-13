<template>
  <div class="mb-8 w-full text-center">
    <div
      v-if="icon"
      class="w-16 h-16 rounded-full bg-amber-50 border border-amber-200 flex items-center justify-center mx-auto mb-5"
    >
      <component :is="icon" />
    </div>
    <h1 class="text-3xl font-bold text-zinc-900 mb-2">
      {{ title }}
    </h1>
    <p class="text-base text-zinc-500">{{ subtitle }}</p>
  </div>
</template>

<script setup lang="ts">
import type { Component } from "vue";

interface AuthPageHeaderProps {
  title: string;
  subtitle: string;
  icon?: Component;
}

defineProps<AuthPageHeaderProps>();
</script>

<style scoped></style>
