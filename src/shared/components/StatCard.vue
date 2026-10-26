<template>
  <div
    :class="
      cn(
        'rounded-lg border p-5 flex flex-col gap-4 transition-shadow hover:shadow-md',
        activeStyle.wrapper,
      )
    "
  >
    <div class="flex items-start justify-between">
      <p
        :class="
          cn('text-xs font-semibold uppercase tracking-widest', activeStyle.label)
        "
      >
        {{ label }}
      </p>
      <span
        :class="
          cn(
            'w-9 h-9 rounded-md flex items-center justify-center shrink-0 border',
            activeStyle.iconBg,
          )
        "
      >
        <component
          :is="icon"
          :size="16"
          :class="cn('text-base', activeStyle.iconText)"
        />
      </span>
    </div>

    <div v-if="loading" class="h-8 w-24 rounded bg-black/5 animate-pulse" />
    <p
      v-else
      :class="cn('text-3xl font-bold leading-none', activeStyle.value)"
    >
      {{ value }}
    </p>

    <p
      v-if="trend"
      :class="
        cn(
          'text-xs font-medium',
          variant === 'brand'
            ? 'text-amber-100'
            : trend.positive
              ? 'text-success'
              : 'text-zinc-400',
        )
      "
    >
      {{ trend.label }}
    </p>
  </div>
</template>

<script setup lang="ts">
import { computed, type Component } from "vue";
import { cn } from "@/shared/lib/utils";

type StatCardVariant = "default" | "brand" | "warning" | "success" | "info";

interface Props {
  label: string;
  value: string | number;
  icon: Component;
  trend?: {
    label: string;
    positive?: boolean;
  };
  variant?: StatCardVariant;
  loading?: boolean;
}

// Dictionary to handle the semantic color mappings cleanly
const styles: Record<
  StatCardVariant,
  {
    wrapper: string;
    label: string;
    iconBg: string;
    iconText: string;
    value: string;
  }
> = {
  default: {
    wrapper: "bg-white border-zinc-200",
    label: "text-zinc-400",
    iconBg: "bg-zinc-50 border-zinc-200",
    iconText: "text-amber-500",
    value: "text-zinc-900",
  },
  brand: {
    wrapper: "bg-amber-400 border-amber-400",
    label: "text-amber-100",
    iconBg: "bg-amber-500/40 border-transparent",
    iconText: "text-white",
    value: "text-white",
  },
  warning: {
    wrapper: "bg-warning-bg border-warning/20",
    label: "text-warning/80",
    iconBg: "bg-white border-warning/20",
    iconText: "text-warning",
    value: "text-warning",
  },
  success: {
    wrapper: "bg-success-bg border-success/20",
    label: "text-success/80",
    iconBg: "bg-white border-success/20",
    iconText: "text-success",
    value: "text-success",
  },
  info: {
    wrapper: "bg-blue-50 border-blue-200",
    label: "text-blue-500",
    iconBg: "bg-white border-blue-100",
    iconText: "text-blue-600",
    value: "text-blue-700",
  },
};

const props = withDefaults(defineProps<Props>(), {
  variant: "default",
  loading: false,
});

const activeStyle = computed(() => styles[props.variant]);
</script>
