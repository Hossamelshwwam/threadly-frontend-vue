<template>
  <div class="flex items-center gap-0.5" aria-label="Rated {{ rating }} out of 5">
    <Star
      v-for="i in 5"
      :key="i"
      :size="size"
      :fill="i <= filled ? 'currentColor' : 'none'"
      :class="i <= filled ? 'text-amber-400' : 'text-zinc-300'"
    />
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { Star } from "lucide-vue-next";

interface StarsProps {
  rating: number;
  size?: number;
}

const props = withDefaults(defineProps<StarsProps>(), { size: 16 });

const filled = computed(() => Math.round(props.rating));
</script>

<style scoped></style>
