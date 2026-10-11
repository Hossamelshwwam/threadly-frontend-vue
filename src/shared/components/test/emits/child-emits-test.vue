<template>
  <div class="flex gap-10">
    <button @click="emits('increment', 2)">increament</button>
    <button @click="emits('reset')">reset</button>
  </div>
</template>

<script setup lang="ts">
const emits = defineEmits<{
  increment: [count: number];
  reset: [];
}>();
</script>

<style scoped></style>
