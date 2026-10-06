<template>
  <AdminGuard>
    <div class="min-h-screen bg-zinc-50 font-sans">
      <AdminSidebar />

      <div class="lg:ml-60 flex flex-col min-h-screen min-w-0">
        <AdminHeader />

        <main class="flex-1 p-4 sm:p-6 overflow-x-hidden">
          <slot />
        </main>
      </div>
    </div>
  </AdminGuard>
</template>

<script setup lang="ts">
import AdminGuard from "./AdminGuard.vue";
import AdminHeader from "./AdminHeader.vue";
import AdminSidebar from "./AdminSidebar.vue";
</script>

<style scoped></style>
