<template>
  <div
    :class="
      cn([
        'relative flex-1 font-sans',
        half ? 'col-span-2 lg:col-span-1' : 'col-span-2',
        className,
      ])
    "
  >
    <label
      v-if="label"
      :for="name"
      :class="
        cn([
          'block text-xs font-medium text-on-surface-muted uppercase tracking-wider mb-1.5',
          labalClass,
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
            'absolute top-1/2 -translate-y-1/2 inset-s-4 text-xl text-on-surface-muted pointer-events-none',
            IconClass,
          ])
        "
      />

      <input
        :type="type === 'password' && show ? 'text' : type"
        :name="name"
        :id="name"
        :placeholder="placeholder"
        :maxlength="max"
        :disabled="disabled"
        v-model="value"
        :step="step"
        :minlength="min"
        :autofocus="autoFocus"
        :class="
          cn([
            'w-full h-12 px-4 border rounded bg-zinc-50 transition-all outline-none text-base text-on-surface placeholder:text-on-surface-muted',
            error
              ? 'border-error focus:ring-2 focus:ring-error/20 focus:border-error'
              : 'border-border focus:ring-2 focus:ring-border-focus focus:border-border-focus',
            Icon && 'ps-11',
            type === 'password' && 'pe-11',
            disabled && 'opacity-60 cursor-not-allowed',
            InputClass,
          ])
        "
      />
      <button
        v-if="type === 'password'"
        type="button"
        @click="show = !show"
        class="absolute top-1/2 -translate-y-1/2 inset-e-4 text-xl text-on-surface-muted hover:text-on-surface transition-colors focus:outline-none"
        :aria-label="show ? 'Hide password' : 'Show password'"
      >
        <EyeOff v-if="show" />
        <Eye v-else />
      </button>
    </div>

    <p v-if="error" class="text-error text-xs font-medium mt-1.5">
      {{ error }}
    </p>
  </div>
</template>

<script setup lang="ts">
import { cn } from "@/shared/lib/utils";
import { Eye, EyeOff } from "lucide-vue-next";
import { ref, type Component } from "vue";

interface Props {
  name: string;
  type: string;
  label?: string;
  placeholder?: string;
  half?: boolean;
  disabled?: boolean;
  InputClass?: string;
  labalClass?: string;
  IconClass?: string;
  className?: string;
  error?: string;
  min?: number;
  max?: number;
  step?: number;
  Icon?: Component;
  autoFocus?: boolean;
}

const show = ref(false);

const value = defineModel<string>();

defineProps<Props>();
</script>

<style scoped></style>
