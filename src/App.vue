<script setup lang="ts">
import { RouterView } from "vue-router";
import TableTest from "./shared/components/test/table-test.vue";
import ParentEmitsTest from "./shared/components/test/emits/parent-emits-test.vue";
</script>

<template>
  <div class="font-sans">
    <RouterView />
    <TableTest />
    <ParentEmitsTest />
  </div>
</template>

<style scoped></style>
