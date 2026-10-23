<template>
  <div class="max-w-2xl space-y-6 animate-fadeIn">
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div class="bg-zinc-50 border border-zinc-100 rounded-xl p-5">
        <div class="flex items-center gap-2 text-zinc-500 mb-1.5">
          <User :size="16" />
          <span class="text-xs font-bold uppercase tracking-wider">
            Full Name
          </span>
        </div>
        <p class="text-base font-semibold text-zinc-900">
          {{ user.name }}
        </p>
      </div>

      <div class="bg-zinc-50 border border-zinc-100 rounded-xl p-5">
        <div class="flex items-center gap-2 text-zinc-500 mb-1.5">
          <Mail :size="16" />
          <span class="text-xs font-bold uppercase tracking-wider">
            Email Address
          </span>
        </div>
        <p class="text-base font-semibold text-zinc-900">
          {{ user.email }}
        </p>
      </div>

      <div
        class="bg-zinc-50 border border-zinc-100 rounded-xl p-5 md:col-span-2"
      >
        <div class="flex items-center gap-2 text-zinc-500 mb-1.5">
          <Phone :size="16" />
          <span class="text-xs font-bold uppercase tracking-wider">
            Phone Number
          </span>
        </div>
        <p class="text-base font-semibold text-zinc-900">
          <template v-if="user.phone">{{ user.phone }}</template>
          <span v-else class="text-zinc-400 italic">
            No phone number added
          </span>
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Mail, Phone, User } from "lucide-vue-next";
import type { UserProfile } from "../../types/user.types";

defineProps<{
  user: UserProfile;
}>();
</script>

<style scoped></style>
