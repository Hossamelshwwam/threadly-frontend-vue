<template>
  <div
    :class="[
      'relative flex-1 font-sans',
      classname,
      half ? 'col-span-2 lg:col-span-1' : 'col-span-2',
    ]"
  >
    <label
      v-if="label"
      :for="name"
      :class="[
        'block text-xs font-medium text-on-surface-muted uppercase tracking-wider mb-1.5',
        labelClass,
      ]"
    >
      {{ label }}
    </label>

    <div class="relative">
      <textarea
        :id="name"
        :name="name"
        :placeholder="placeholder"
        :max-length="maxLength"
        :disabled="disabled"
        :rows="rows"
        :autoFocus="autoFocus"
        v-bind="textareaAttrs"
        v-model="value"
        :class="[
          'w-full py-3 px-4 border rounded bg-zinc-50 transition-all outline-none text-base text-on-surface placeholder:text-on-surface-muted',
          error
            ? 'border-error focus:ring-2 focus:ring-error/20 focus:border-error'
            : 'border-border focus:ring-2 focus:ring-border-focus focus:border-border-focus',
          disabled && 'opacity-60 cursor-not-allowed',
          resize === 'none' && 'resize-none',
          resize === 'both' && 'resize',
          resize === 'horizontal' && 'resize-x',
          resize === 'vertical' && 'resize-y',
          TextareaClass,
        ]"
      ></textarea>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  textareaAttrs: Record<string, unknown>;
  value: string;
  name: string;
  label?: string;
  placeholder?: string;
  half?: boolean;
  disabled?: boolean;
  TextareaClass?: string;
  labelClass?: string;
  classname?: string;
  error?: string;
  maxLength?: number;
  rows?: number;
  autoFocus?: boolean;
  resize?: "none" | "both" | "horizontal" | "vertical";
}

const {
  TextareaClass,
  resize,
  autoFocus,
  classname,
  disabled,
  error,
  half,
  label,
  labelClass,
  maxLength,
  name,
  placeholder,
  rows,
} = defineProps<Props>();
</script>
