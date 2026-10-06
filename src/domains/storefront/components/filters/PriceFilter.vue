<template>
  <div>
    <label
      class="flex items-center gap-2 text-xs font-semibold tracking-wider uppercase text-zinc-500 mb-2.5"
    >
      <CircleDollarSign :size="14" />
      Price Range (EGP)
    </label>
    <div class="flex items-center gap-2">
      <input
        type="number"
        inputmode="numeric"
        placeholder="Min"
        :value="min ?? ''"
        @input="onMinInput"
        class="w-full bg-white border border-zinc-200 text-sm rounded-lg px-3 py-2.5 focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400/20 transition-all placeholder:text-zinc-400 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
      />
      <span class="text-zinc-300 text-xs shrink-0">—</span>
      <input
        type="number"
        inputmode="numeric"
        placeholder="Max"
        :value="max ?? ''"
        @input="onMaxInput"
        class="w-full bg-white border border-zinc-200 text-sm rounded-lg px-3 py-2.5 focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400/20 transition-all placeholder:text-zinc-400 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { CircleDollarSign } from "lucide-vue-next";

defineProps<{
  min?: string;
  max?: string;
}>();

const emit = defineEmits<{
  (
    e: "change",
    key: "minPrice" | "maxPrice",
    value: string | undefined,
  ): void;
}>();

function onMinInput(e: Event) {
  const value = (e.target as HTMLInputElement).value;
  emit("change", "minPrice", value || undefined);
}

function onMaxInput(e: Event) {
  const value = (e.target as HTMLInputElement).value;
  emit("change", "maxPrice", value || undefined);
}
</script>

<style scoped></style>
