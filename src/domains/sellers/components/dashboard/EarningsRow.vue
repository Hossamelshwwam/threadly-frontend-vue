<template>
  <div class="flex items-center justify-between">
    <div class="flex items-center gap-2">
      <component
        v-if="icon"
        :is="icon"
        :size="14"
        class="text-sm text-zinc-400"
      />
      <span class="text-sm text-zinc-500">{{ label }}</span>
    </div>
    <span
      :class="
        `text-sm ${bold ? 'font-bold' : 'font-semibold'} ${
          negative ? 'text-red-500' : colorMap[variant]
        }`
      "
    >
      EGP {{ value.toLocaleString() }}
    </span>
  </div>
</template>

<script setup lang="ts">
import type { Component } from "vue";

withDefaults(
  defineProps<{
    label: string;
    value: number;
    icon?: Component;
    negative?: boolean;
    bold?: boolean;
    variant?: "default" | "success" | "warning";
  }>(),
  {
    negative: false,
    bold: false,
    variant: "default",
  },
);

const colorMap = {
  default: "text-zinc-900",
  success: "text-success",
  warning: "text-warning",
} as const;
</script>
