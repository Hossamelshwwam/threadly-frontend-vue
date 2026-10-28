<template>
  <span
    :class="
      cn(
        'text-xs font-semibold px-2 py-0.5 rounded-md border capitalize',
        styles[role],
      )
    "
  >
    {{ role }}
  </span>
</template>

<script setup lang="ts">
import { cn } from "@/shared/lib/utils";
import type { UserRole } from "../types/user.types";

defineProps<{
  role: UserRole;
}>();

const styles: Record<UserRole, string> = {
  buyer: "bg-amber-50 text-amber-700 border-amber-200",
  seller: "bg-zinc-100 text-zinc-700 border-zinc-200",
  admin: "bg-zinc-800 text-white border-zinc-800",
};
</script>
