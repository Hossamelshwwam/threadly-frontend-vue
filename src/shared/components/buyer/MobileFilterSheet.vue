<template>
  <div>
    <div
      @click="onClose"
      :class="[
        'fixed inset-0 bg-zinc-900/40 backdrop-blur-sm z-40 transition-opacity duration-300',
        open ? 'opacity-100' : 'opacity-0 pointer-events-none',
      ]"
    ></div>

    <div
      ref="panelRef"
      role="dialog"
      aria-modal="true"
      aria-label="Filters"
      :class="[
        'fixed top-0 right-0 bottom-0 w-[300px] bg-zinc-50 z-50 shadow-2xl transition-transform duration-300 ease-out',
        open ? 'translate-x-0' : 'translate-x-full',
      ]"
    >
      <div class="h-full overflow-y-auto p-4">
        <FilterSidebar
          :filters="filters"
          :onFilterChange="onFilterChange"
          :onApply="handleApply"
          :onReset="handleReset"
          :appliedFilterCount="appliedFilterCount"
          :onClose="onClose"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { FiltersState } from "@/domains/storefront/components/filters/FilterSidebar.vue";
import FilterSidebar from "@/domains/storefront/components/filters/FilterSidebar.vue";
import { onUnmounted, ref, watch } from "vue";
interface MobileFilterSheetProps {
  open: boolean;
  onClose: () => void;
  filters: FiltersState;
  onFilterChange: (key: string, value: string | undefined) => void;
  onApply: () => void;
  onReset: () => void;
  appliedFilterCount: number;
}
const FOCUSABLE =
  'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';
const props = defineProps<MobileFilterSheetProps>();
const panelRef = ref<HTMLDivElement | null>(null);

watch(
  () => props.open,
  (open) => {
    if (open) {
      document.body.style.overflow = "hidden";

      const panel = panelRef.value;

      if (panel) {
        const first = panel.querySelector<HTMLElement>(FOCUSABLE);

        first?.focus();
      }

      window.addEventListener("keydown", handleKey);
    } else {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKey);
    }
  },
);

const handleKey = (e: KeyboardEvent) => {
  const panel = panelRef.value;
  if (!panel) return;

  if (e.key === "Escape") {
    props.onClose();
    return;
  }

  if (e.key === "Tab") {
    const focusables = panel.querySelectorAll<HTMLElement>(FOCUSABLE);
    const first = focusables[0];
    const last = focusables[focusables.length - 1];

    if (e.shiftKey) {
      if (document.activeElement === first) {
        e.preventDefault();
        last?.focus();
      }
    } else {
      if (document.activeElement === last) {
        e.preventDefault();
        first?.focus();
      }
    }
  }
};

const handleApply = () => {
  props.onApply();
  props.onClose();
};

const handleReset = () => {
  props.onReset();
  props.onClose();
};

onUnmounted(() => {
  document.body.style.overflow = "";
  window.removeEventListener("keydown", handleKey);
});
</script>

<style scoped></style>
