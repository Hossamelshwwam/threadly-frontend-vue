<template>
  <div class="col-span-1 space-y-6 sticky top-6 font-sans">
    <div class="bg-white border border-zinc-100 rounded-2xl p-6 shadow-sm">
      <h2
        class="text-sm font-bold text-zinc-900 mb-4 border-b border-zinc-100 pb-3"
      >
        Listing Visibility
      </h2>

      <div class="space-y-3">
        <div
          v-for="s in statuses"
          :key="s.value"
          @click="status = s.value"
          :class="
            cn(
              'border rounded-xl p-3 cursor-pointer transition-all flex flex-col gap-0.5 relative overflow-hidden',
              status === s.value
                ? statusCardStyles[s.value]
                : 'border-zinc-200 bg-zinc-50 hover:bg-zinc-100/50',
            )
          "
        >
          <!-- Active indicator dot -->
          <div
            :class="
              cn(
                'absolute top-4 right-4 w-2 h-2 rounded-full',
                status === s.value ? statusDotStyles[s.value] : 'bg-zinc-300',
              )
            "
          />

          <span
            :class="
              cn(
                'text-sm font-bold capitalize',
                status === s.value
                  ? statusLabelStyles[s.value]
                  : 'text-zinc-600',
              )
            "
          >
            {{ s.label }}
          </span>
          <span class="text-xs text-zinc-500">{{ s.desc }}</span>
        </div>
      </div>
    </div>

    <CustomButton
      type="submit"
      variant="solid"
      theme="primary"
      full-width
      class="h-14 text-base rounded-xl shadow-md hover:shadow-lg transition-all"
      :disabled="isPending"
      :left-icon="SaveIcon"
    >
      {{ isPending ? "Processing..." : submitLabel }}
    </CustomButton>
  </div>
</template>

<script setup lang="ts">
import { h } from "vue";
import { Save } from "lucide-vue-next";
import CustomButton from "@/shared/components/custom-button/CustomButton.vue";
import { cn } from "@/shared/lib/utils";
import type { ProductStatus } from "../../types/product.types";

withDefaults(
  defineProps<{
    isPending: boolean;
    submitLabel?: string;
  }>(),
  {
    submitLabel: "Save Product",
  },
);

const status = defineModel<ProductStatus>("status", { required: true });

const statuses: {
  value: ProductStatus;
  label: string;
  desc: string;
}[] = [
  {
    value: "active",
    label: "Active",
    desc: "Visible to buyers instantly",
  },
  {
    value: "draft",
    label: "Draft",
    desc: "Hidden, work in progress",
  },
  {
    value: "archived",
    label: "Archived",
    desc: "Hidden, discontinued",
  },
];

// Static class maps: the React version built these with template strings
// (`border-${color}`), which Tailwind can never generate at build time.
const statusCardStyles: Record<ProductStatus, string> = {
  active: "border-success bg-success-bg/30",
  draft: "border-warning bg-warning-bg/30",
  archived: "border-error bg-error-bg/30",
};

const statusDotStyles: Record<ProductStatus, string> = {
  active: "bg-success",
  draft: "bg-warning",
  archived: "bg-error",
};

const statusLabelStyles: Record<ProductStatus, string> = {
  active: "text-success",
  draft: "text-warning",
  archived: "text-error",
};

const SaveIcon = () => h(Save, { size: 20, class: "text-xl" });
</script>
