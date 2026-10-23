<template>
  <section class="bg-white border border-zinc-200 rounded-2xl p-6 shadow-sm">
    <div
      class="flex items-center justify-between mb-4 border-b border-zinc-100 pb-4"
    >
      <h2 class="text-lg font-bold text-zinc-900">Shipping Address</h2>
      <button
        type="button"
        @click="showAddressForm = !showAddressForm"
        class="flex items-center gap-1 text-sm font-bold text-amber-600 hover:text-amber-700 transition-colors"
      >
        <Plus :size="16" />
        {{ !showAddressForm ? "Add new address" : "Use saved address" }}
      </button>
    </div>

    <div
      v-if="!showAddressForm && addresses.length > 0"
      class="grid lg:grid-cols-3 grid-cols-1 gap-5 pb-4"
    >
      <button
        v-for="addr in addresses"
        :key="addr._id"
        @click="selectAddress = addr._id"
        :class="
          cn(
            'p-4 rounded-xl border-2 cursor-pointer transition-all snap-start flex flex-col gap-1 relative',
            selectAddress === addr._id
              ? 'border-amber-400 bg-amber-50/30'
              : 'border-zinc-200 hover:border-zinc-300 bg-white',
          )
        "
      >
        <span class="font-bold text-zinc-900">{{ addr.label }}</span>
        <!-- <span class="text-xs text-zinc-500 mt-1">{{ addr. }}</span> -->
        <span
          class="text-xs font-medium text-zinc-600 leading-relaxed mt-1 line-clamp-3 text-pretty"
        >
          {{ addr.street }},<br />
          {{ addr.city }}, {{ addr.state }} {{ addr.postalCode }}
        </span>

        <!-- Visual indicator top right -->
        <span
          v-if="selectAddress === addr._id"
          class="absolute top-4 right-4 w-3 h-3 rounded-full bg-amber-500 ring-4 ring-amber-100"
        />
      </button>
    </div>
    <AddAddressForm v-else v-model:show-address-form="showAddressForm" />
  </section>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { Plus } from "lucide-vue-next";
import { cn } from "@/shared/lib/utils";
import type { Address } from "@/domains/users/types/user.types";
import AddAddressForm from "./AddAddressForm.vue";

defineProps<{
  addresses: Address[];
}>();

const selectAddress = defineModel<string>("selectAddress", { required: true });

const showAddressForm = ref(false);
</script>

<style scoped></style>
