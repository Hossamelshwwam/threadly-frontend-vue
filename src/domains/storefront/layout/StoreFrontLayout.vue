<template>
  <div class="min-h-screen bg-zinc-50 text-zinc-900 flex flex-col">
    <SidebarProvider>
      <Navbar />
      <main class="flex-1"><RouterView /></main>
    </SidebarProvider>
    <Footer />
  </div>
</template>

<script setup lang="ts">
import Footer from "@/shared/components/buyer/Footer.vue";
import Navbar from "@/shared/components/buyer/Navbar.vue";
import SidebarProvider from "@/shared/components/ui/sidebar/SidebarProvider.vue";
import { RouterView } from "vue-router";
</script>

<style scoped></style>
