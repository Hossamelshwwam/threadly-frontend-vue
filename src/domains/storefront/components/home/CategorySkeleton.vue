<template>
  <section class="container mx-auto px-8 py-20">
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
      <div
        v-for="(_, i) in Array.from({ length: 4 })"
        :key="i"
        :class="`rounded-2xl bg-zinc-100 animate-pulse ${
          i === 0 ? 'md:col-span-2 md:row-span-2 aspect-square' : 'aspect-[4/5]'
        }`"
      />
    </div>
  </section>
</template>

<script setup lang="ts"></script>

<style scoped></style>
