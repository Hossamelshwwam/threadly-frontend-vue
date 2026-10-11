<template>
  <TriangleAlert v-if="variant === 'danger'" :class="cls" :size="22" />
  <CircleAlert v-else-if="variant === 'warning'" :class="cls" :size="22" />
  <CircleCheck v-else-if="variant === 'success'" :class="cls" :size="22" />
  <Info v-else-if="variant === 'info'" :class="cls" :size="22" />
  <CircleHelp v-else :class="cls" :size="22" />
</template>

<script setup lang="ts">
import { computed } from "vue";
import {
  CircleAlert,
  CircleCheck,
  CircleHelp,
  Info,
  TriangleAlert,
} from "lucide-vue-next";
import { cn } from "@/shared/lib/utils";
import type { Variant } from "./type";

const props = defineProps<{ variant: Variant; class?: string }>();

const cls = computed(() => cn("text-[22px]", props.class));
</script>

<style scoped></style>
