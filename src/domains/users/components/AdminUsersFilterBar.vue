<template>
  <div
    class="bg-white border border-zinc-200 rounded-lg px-4 py-3 flex flex-col sm:flex-row gap-3"
  >
    <div class="flex-1">
      <CustomInput
        v-model="search"
        name="search"
        type="text"
        placeholder="Search by name or email..."
        :Icon="Search"
      />
    </div>
    <div class="flex items-center gap-1.5">
      <button
        v-for="f in ROLE_FILTERS"
        :key="f.value"
        type="button"
        @click="roleFilter = f.value"
        :class="
          cn(
            'text-sm font-semibold px-4 py-2 rounded-md transition-colors',
            roleFilter === f.value
              ? 'bg-amber-400 text-white'
              : 'bg-zinc-100 text-zinc-600 hover:bg-zinc-200',
          )
        "
      >
        {{ f.label }}
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Search } from "lucide-vue-next";

import CustomInput from "@/shared/components/custom-input/CustomInput.vue";
import { cn } from "@/shared/lib/utils";
import type { UserRole } from "../types/user.types";

const ROLE_FILTERS: { label: string; value: UserRole | "" }[] = [
  { label: "All", value: "" },
  { label: "Buyer", value: "buyer" },
  { label: "Seller", value: "seller" },
];

const search = defineModel<string>("search", { required: true });
const roleFilter = defineModel<UserRole | "">("roleFilter", { required: true });
</script>
