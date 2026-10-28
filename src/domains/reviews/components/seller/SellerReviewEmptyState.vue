<template>
  <div class="p-12 text-center space-y-4">
    <div
      class="w-16 h-16 bg-zinc-50 rounded-full flex items-center justify-center mx-auto"
    >
      <Inbox :size="30" class="text-3xl text-zinc-300" />
    </div>
    <div>
      <p class="text-sm font-bold text-zinc-600">
        {{ hasActiveFilter ? "No matching reviews" : "No reviews yet" }}
      </p>
      <p class="text-xs text-zinc-400 mt-1 max-w-xs mx-auto">
        {{
          hasActiveFilter
            ? "No reviews match the selected rating. Try a different filter."
            : "Reviews from customers will appear here once they start submitting feedback on your products."
        }}
      </p>
    </div>
    <button
      v-if="hasActiveFilter"
      @click="emit('clear')"
      class="text-xs font-semibold text-main hover:text-main-warm hover:underline transition-colors"
    >
      Clear filters
    </button>
  </div>
</template>

<script setup lang="ts">
import { Inbox } from "lucide-vue-next";

defineProps<{
  hasActiveFilter: boolean;
}>();

const emit = defineEmits<{
  clear: [];
}>();
</script>
