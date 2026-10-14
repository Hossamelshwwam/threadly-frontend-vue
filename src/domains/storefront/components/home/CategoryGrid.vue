<template>
  <CategorySkeleton v-if="isLoading" />
  <section
    v-else-if="categories.length > 0"
    class="container mx-auto px-8 py-20"
  >
    <div class="text-center mb-14">
      <span
        class="text-xs font-semibold tracking-[0.25em] uppercase text-amber-500"
      >
        Curated Collections
      </span>
      <h2
        class="text-4xl md:text-5xl font-bold text-zinc-900 mt-3 text-balance"
      >
        Shop by Category
      </h2>
    </div>
    <div class="max-w-5xl mx-auto space-y-0 divide-y divide-zinc-100">
      <RouterLink
        v-for="(category, i) in categories"
        :key="category._id"
        :to="`/products?category=${category.slug}`"
        class="group flex flex-col sm:flex-row items-stretch py-6 sm:py-0 transition-colors hover:bg-amber-50/40 -mx-8 px-8"
      >
        <div
          :class="`sm:w-2/5 relative overflow-hidden rounded-xl sm:rounded-2xl ${i % 2 === 1 ? 'sm:order-2' : ''}`"
        >
          <img
            v-if="category.image"
            :src="category.image"
            :alt="category.name"
            class="w-100 h-125 object-cover transition-all duration-700 group-hover:scale-105"
          />
          <div
            v-else
            class="w-full h-full flex items-center justify-center bg-zinc-50"
          >
            <span class="text-4xl font-black text-zinc-200">
              {{ category.name?.charAt(0) }}
            </span>
          </div>
        </div>
        <div
          :class="`sm:w-3/5 flex flex-col justify-center py-4 sm:py-0 sm:px-8 ${i % 2 === 1 ? 'sm:order-1 sm:items-end sm:text-right' : ''}`"
        >
          <h3
            class="text-2xl sm:text-3xl font-bold text-zinc-900 group-hover:text-amber-600 transition-colors"
          >
            {{ category.name }}
          </h3>
          <p class="text-zinc-500 text-sm mt-1 line-clamp-2">
            Discover our curated {{ category.name?.toLowerCase() }} collection —
            crafted for style and comfort.
          </p>
          <span
            class="inline-flex items-center gap-1 text-amber-600 text-sm font-medium mt-2"
          >
            Explore <ArrowRight :size="14" />
          </span>
        </div>
      </RouterLink>
    </div>
    <div class="text-center mt-10">
      <CustomButton :right-icon="ArrowRight">
        <RouterLink to="/products">View All Categories</RouterLink>
      </CustomButton>
    </div>
  </section>
</template>

<script setup lang="ts">
import { useListCategories } from "@/domains/categories/hooks/useCategories";
import CustomButton from "@/shared/components/custom-button/CustomButton.vue";
import { ArrowRight } from "lucide-vue-next";
import CategorySkeleton from "./CategorySkeleton.vue";
import { computed } from "vue";
const { data, isLoading } = useListCategories();

const categories = computed(() =>
  (data.value?.data ?? []).filter((c: any) => c.isActive).slice(0, 4),
);
</script>

<style scoped></style>
