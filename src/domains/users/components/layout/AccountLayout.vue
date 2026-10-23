<template>
  <div
    class="bg-zinc-50 min-h-screen flex justify-center items-center pt-28 pb-20 font-sans"
  >
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
      <AuthGuard>
        <div class="grid grid-cols-1 lg:grid-cols-8 gap-8 items-start">
          <div class="lg:col-span-2">
            <AccountSidebar />
          </div>

          <div class="lg:col-span-6 flex">
            <RouterView />
          </div>
        </div>
      </AuthGuard>
    </div>
  </div>
</template>

<script setup lang="ts">
import AccountSidebar from "@/domains/users/components/account/AccountSidebar.vue";
import AuthGuard from "@/domains/auth/guard/AuthGuard.vue";
</script>

<style scoped></style>
