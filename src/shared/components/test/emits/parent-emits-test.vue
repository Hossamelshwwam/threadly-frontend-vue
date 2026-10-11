<template>
  <div>
    <ChildEmitsTest @increment="handleIncrement" @reset="count = 0" />
    <p class="text-xl text-main">{{ count }}</p>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import ChildEmitsTest from "./child-emits-test.vue";
const count = ref(0);
const handleIncrement = (number: number) => {
  count.value += number;
};
</script>

<style scoped></style>
