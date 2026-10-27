<template>
  <div
    class="bg-white border border-zinc-200 rounded-lg p-4 space-y-4 font-sans shadow-xs"
  >
    <!-- Upper Layer: Core search input and drop-down selectors -->
    <div class="flex flex-col md:flex-row gap-3">
      <CustomInput
        name="search"
        type="text"
        label="Search Products"
        placeholder="Search products by name or slug..."
        :Icon="SearchIcon"
        :model-value="search"
        class="flex-1"
        @update:model-value="onSearchInput"
      />

      <!-- Category Filter Selector -->
      <CustomSelect
        name="category"
        label="Category"
        placeholder="All Categories"
        :options="categoryOptions"
        :model-value="categoryFilter"
        class="flex-1"
        @update:model-value="onCategoryChange"
      />

      <!-- Merchant Store Filter Selector -->
      <CustomSelect
        v-if="enableSeller && sellers"
        name="seller"
        label="Seller"
        placeholder="All Sellers"
        :options="sellerOptions"
        :model-value="sellerFilter"
        class="flex-1"
        @update:model-value="onSellerChange"
      />
    </div>

    <!-- Lower Layer: Status Filter Badge Controls -->
    <div
      class="border-t border-zinc-100 pt-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2"
    >
      <span
        class="text-xs font-semibold text-zinc-400 uppercase tracking-wider"
      >
        Product State Filter
      </span>
      <div class="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
        <button
          v-for="f in STATUS_FILTERS"
          :key="f.label"
          type="button"
          @click="onStatusChange(f.value)"
          :class="
            cn(
              'text-xs font-semibold px-3.5 py-1.5 rounded-md transition-colors whitespace-nowrap cursor-pointer',
              statusFilter === f.value
                ? 'bg-amber-400 text-white'
                : 'bg-zinc-100 text-zinc-600 hover:bg-zinc-200',
            )
          "
        >
          {{ f.label }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, h } from "vue";
import { Search } from "lucide-vue-next";
import CustomInput from "@/shared/components/custom-input/CustomInput.vue";
import CustomSelect from "@/shared/components/custom-select/CustomSelect.vue";
import { cn } from "@/shared/lib/utils";
import type { ProductStatus } from "../types/product.types";
import type { SellerProfile } from "@/domains/sellers/types/seller.types";
import type { Category } from "@/domains/categories/types/category.types";

const STATUS_FILTERS: { label: string; value: ProductStatus | "" }[] = [
  { label: "All Statuses", value: "" },
  { label: "Active", value: "active" },
  { label: "Draft", value: "draft" },
  { label: "Archived", value: "archived" },
];

const props = withDefaults(
  defineProps<{
    enableSeller?: boolean;
    sellers?: SellerProfile[];
    categories: Category[];
  }>(),
  {
    enableSeller: true,
  },
);

const search = defineModel<string>("search", { required: true });
const statusFilter = defineModel<ProductStatus | "">("statusFilter", {
  required: true,
});
const categoryFilter = defineModel<string>("categoryFilter", {
  required: true,
});
const sellerFilter = defineModel<string>("seller", { default: "" });

const SearchIcon = () => h(Search, { size: 20 });

const categoryOptions = computed(() =>
  props.categories.map((cat) => ({
    label: cat.name,
    value: cat._id,
  })),
);

const sellerOptions = computed(() =>
  (props.sellers ?? []).map((seller) => ({
    label: seller.storeName,
    value: seller._id,
  })),
);

const onSearchInput = (value: string | undefined) => {
  search.value = value ?? "";
};

const onCategoryChange = (value: string | undefined) => {
  categoryFilter.value = value ?? "";
};

const onSellerChange = (value: string | undefined) => {
  sellerFilter.value = value ?? "";
};

const onStatusChange = (value: ProductStatus | "") => {
  statusFilter.value = value;
};
</script>
