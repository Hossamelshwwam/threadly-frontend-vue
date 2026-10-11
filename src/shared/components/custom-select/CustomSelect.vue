<template>
  <div
    :class="
      cn(
        'relative font-sans',
        half ? 'col-span-2 lg:col-span-1' : 'col-span-2',
        props.class,
      )
    "
  >
    <label
      v-if="label"
      :for="name"
      :class="
        cn(
          'block text-xs font-medium text-on-surface-muted uppercase tracking-wider mb-1.5',
          labelClass,
        )
      "
    >
      {{ label }}
    </label>
    <div class="relative">
      <component
        :is="Icon"
        v-if="Icon"
        :class="
          cn(
            'absolute top-1/2 -translate-y-1/2 inset-s-4 text-xl text-on-surface-muted pointer-events-none z-10',
            iconClass,
          )
        "
      />

      <select
        :id="name"
        :name="name"
        :disabled="disabled"
        v-model="value"
        :class="
          cn(
            'w-full h-12 px-4 pe-10 pt-2.5 border rounded bg-zinc-50 transition-all outline-none text-base text-on-surface cursor-pointer',
            error
              ? 'border-error focus:ring-2 focus:ring-error/20 focus:border-error'
              : 'border-border focus:ring-2 focus:ring-border-focus focus:border-border-focus',
            Icon && 'ps-11',
            disabled && 'opacity-60 cursor-not-allowed',
            selectClass,
          )
        "
      >
        <option
          v-if="placeholder"
          value=""
          class="hover:bg-main! focus:bg-main! py-2 px-2"
        >
          {{ placeholder }}
        </option>
        <option
          v-for="opt in options"
          :key="opt.value"
          :value="opt.value"
          class="hover:bg-main! focus:bg-main! py-2 px-2"
        >
          {{ opt.label }}
        </option>
      </select>

      <ChevronDown
        class="absolute top-1/2 -translate-y-1/2 inset-e-4 text-sm text-on-surface-muted pointer-events-none"
        :size="14"
      />
    </div>

    <p v-if="error" class="text-error text-xs font-medium mt-1.5">
      {{ error }}
    </p>
  </div>
</template>

<script setup lang="ts">
import type { Component } from "vue";
import { ChevronDown } from "lucide-vue-next";
import { cn } from "@/shared/lib/utils";

interface SelectOption {
  label: string;
  value: string;
}

interface Props {
  name: string;
  options: SelectOption[];
  label?: string;
  placeholder?: string;
  half?: boolean;
  disabled?: boolean;
  selectClass?: string;
  labelClass?: string;
  iconClass?: string;
  class?: string;
  error?: string;
  Icon?: Component;
}

const props = defineProps<Props>();

const value = defineModel<string>();
</script>

<style scoped></style>
