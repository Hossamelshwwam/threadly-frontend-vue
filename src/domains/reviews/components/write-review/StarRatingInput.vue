<template>
  <div>
    <label
      class="block text-sm font-black text-zinc-900 mb-3 uppercase tracking-wider"
    >
      Overall Rating *
    </label>
    <div class="flex items-center gap-2">
      <button
        v-for="star in stars"
        :key="star"
        type="button"
        :aria-label="`Rate ${star} ${star === 1 ? 'star' : 'stars'}`"
        @click="emit('change', star)"
        class="transition-transform hover:scale-110 focus:outline-none"
      >
        <Star
          :size="36"
          :class="star <= value ? 'text-amber-400' : 'text-zinc-200'"
          fill="currentColor"
        />
      </button>
    </div>
    <p v-if="error" class="text-red-500 text-xs font-bold mt-2">
      {{ error }}
    </p>
  </div>
</template>

<script setup lang="ts">
import { Star } from "lucide-vue-next";

defineProps<{
  value: number;
  error?: string;
}>();

const emit = defineEmits<{
  (e: "change", rating: number): void;
}>();

const stars = [1, 2, 3, 4, 5];
</script>

<style scoped></style>
