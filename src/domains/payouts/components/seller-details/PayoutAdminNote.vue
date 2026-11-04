<template>
  <div v-if="note" class="bg-white border border-zinc-200 rounded-xl p-6 shadow-xs">
    <h3 class="text-sm font-bold text-zinc-900 mb-3">Admin Note</h3>
    <p
      class="text-sm text-zinc-600 bg-zinc-50 p-4 rounded-lg border border-zinc-100"
    >
      {{ note }}
    </p>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  note?: string;
}>();
</script>
