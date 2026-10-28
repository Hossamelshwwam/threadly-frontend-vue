<template>
  <span
    :class="
      cn(
        'text-xs font-semibold px-2 py-0.5 rounded-md border',
        isActive ? 'bg-success-bg text-success' : 'bg-error-bg text-error',
      )
    "
  >
    {{ isActive ? "Active" : "Suspended" }}
  </span>
</template>

<script setup lang="ts">
import { cn } from "@/shared/lib/utils";

defineProps<{
  isActive: boolean;
}>();
</script>
