<script setup lang="ts">
import { RouterView } from "vue-router";
import TableTest from "./shared/components/test/table-test.vue";
import ParentEmitsTest from "./shared/components/test/emits/parent-emits-test.vue";
import CustomToaster from "./shared/components/custom-toaster/CustomToaster.vue";
</script>

<template>
  <div class="font-sans">
    <RouterView />
    <CustomToaster />
  </div>
</template>

<style scoped></style>
