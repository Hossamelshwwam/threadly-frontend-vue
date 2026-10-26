<template>
  <div
    :class="
      cn([
        'relative flex-1 font-sans',
        half ? 'col-span-2 lg:col-span-1' : 'col-span-2',
      ])
    "
  >
    <label
      v-if="label"
      :for="name"
      :class="
        cn([
          'block text-xs font-medium text-on-surface-muted uppercase tracking-wider mb-1.5',
          labelClass,
        ])
      "
    >
      {{ label }}
    </label>

    <div class="relative">
      <component
        v-if="Icon"
        :is="Icon"
        :class="
          cn([
            'absolute top-4 inset-s-4 text-xl text-on-surface-muted pointer-events-none',
            IconClass,
          ])
        "
      />

      <textarea
        :id="name"
        :name="name"
        :placeholder="placeholder"
        :maxlength="maxlength"
        :disabled="disabled"
        :rows="rows"
        :autofocus="autofocus"
        v-model="value"
        :class="
          cn([
            'w-full py-3 px-4 border rounded bg-zinc-50 transition-all outline-none text-base text-on-surface placeholder:text-on-surface-muted',
            error
              ? 'border-error focus:ring-2 focus:ring-error/20 focus:border-error'
              : 'border-border focus:ring-2 focus:ring-border-focus focus:border-border-focus',
            Icon && 'ps-11',
            disabled && 'opacity-60 cursor-not-allowed',
            resize === 'none' && 'resize-none',
            resize === 'both' && 'resize',
            resize === 'horizontal' && 'resize-x',
            resize === 'vertical' && 'resize-y',
            textareaClass,
          ])
        "
      ></textarea>
    </div>

    <p v-if="error" class="text-error text-xs font-medium mt-1.5">
      {{ error }}
    </p>
  </div>
</template>

<script setup lang="ts">
import { cn } from "@/shared/lib/utils";
import type { Component } from "vue";

interface Props {
  name: string;
  label?: string;
  placeholder?: string;
  half?: boolean;
  disabled?: boolean;
  textareaClass?: string;
  labelClass?: string;
  IconClass?: string;
  error?: string;
  maxlength?: number;
  rows?: number;
  autofocus?: boolean;
  Icon?: Component;
  resize?: "none" | "both" | "horizontal" | "vertical";
}

const value = defineModel<string>();

withDefaults(defineProps<Props>(), {
  rows: 4,
  resize: "none",
});
</script>
