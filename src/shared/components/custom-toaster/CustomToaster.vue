<template>
  <div>
    <Toaster
      rich-colors
      position="bottom-right"
      close-button
      :toast-options="{
        style: {
          fontFamily: 'Cairo, sans-serif',
        },
      }"
    />
  </div>
</template>

<script setup lang="ts">
import { Toaster } from "vue-sonner";
</script>
