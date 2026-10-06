<template>
  <div>
    <label
      class="flex items-center gap-2 text-xs font-semibold tracking-wider uppercase text-zinc-500 mb-2.5"
    >
      <Tag :size="14" />
      Category
    </label>
    <div v-if="isLoading" class="space-y-2">
      <div
        v-for="i in 5"
        :key="i"
        class="h-8 bg-zinc-100 rounded-lg animate-pulse"
      />
    </div>
    <p v-else-if="categories.length === 0" class="text-xs text-zinc-400">
      No categories available
    </p>
    <div v-else class="max-h-48 overflow-y-auto space-y-0.5 pr-1 scrollbar-thin">
      <button
        @click="$emit('select', undefined)"
        :aria-pressed="!selected"
        :class="[
          'w-full text-left text-sm px-3 py-2 rounded-lg transition-colors',
          !selected
            ? 'bg-main text-main-subtle font-medium'
            : 'text-zinc-500 hover:text-zinc-800 hover:bg-zinc-50',
        ]"
      >
        All Categories
      </button>
      <button
        v-for="cat in categories"
        :key="cat._id"
        @click="$emit('select', selected === cat._id ? undefined : cat._id)"
        :aria-pressed="selected === cat._id"
        :class="[
          'w-full text-left text-sm px-3 py-2 rounded-lg transition-colors',
          selected === cat._id
            ? 'bg-main text-main-subtle font-medium'
            : 'text-zinc-500 hover:text-zinc-800 hover:bg-zinc-50',
        ]"
      >
        {{ cat.name }}
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { Tag } from "lucide-vue-next";

interface FlatCategory {
  _id: string;
  name: string;
}

defineProps<{
  selected?: string;
}>();

defineEmits<{
  (e: "select", value: string | undefined): void;
}>();

// TODO: replace with `const { categories, isLoading } = useCategoriesFlat()`
// once src/domains/storefront/hooks/useCategoriesFlat is migrated.
const categories = ref<FlatCategory[]>([]);
const isLoading = ref(false);
</script>

<style scoped></style>
