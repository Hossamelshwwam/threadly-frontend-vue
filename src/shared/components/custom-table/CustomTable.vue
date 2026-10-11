<script lang="ts">
// Normal <script> block: runs once per module, so `features` is a shared
// constant that can also be referenced in prop types.
import {
  createSortedRowModel,
  rowSortingFeature,
  sortFns,
  tableFeatures,
} from "@tanstack/vue-table";

export const tableFeaturesConfig = tableFeatures({
  rowSortingFeature, // sorting APIs + state
  sortedRowModel: createSortedRowModel(), // client-side sorting
  sortFns, // built-in sort functions
});
</script>

<script setup lang="ts" generic="TData extends RowData">
import { computed, toRef } from "vue";
import {
  FlexRender,
  useTable,
  type ColumnDef,
  type RowData,
} from "@tanstack/vue-table";
import { ArrowRight, ChevronDown, ChevronUp, Inbox } from "lucide-vue-next";
import { RouterLink } from "vue-router"; // or <NuxtLink> in Nuxt
import { twMerge } from "tailwind-merge";
import CustomButton from "../custom-button/CustomButton.vue";

const props = withDefaults(
  defineProps<{
    columns: ColumnDef<typeof tableFeaturesConfig, TData>[];
    data: TData[];
    isLoading?: boolean;

    // Empty state
    emptyStateTitle?: string;
    emptyStateDescription?: string;
    showClearFilters?: boolean;

    // Server-side pagination
    page?: number;
    limit?: number;
    totalPages?: number;
    totalItems?: number;
    showPaginationControls?: boolean;

    title?: string;
    href?: string;
  }>(),
  {
    isLoading: false,
    emptyStateTitle: "No data found",
    emptyStateDescription: "Try adjusting your search or filters",
    showClearFilters: false,
    page: 1,
    limit: 20,
    totalPages: 1,
    totalItems: 0,
    showPaginationControls: true,
  },
);

const emit = defineEmits<{
  (e: "clearFilters"): void;
  (e: "pageChange", page: number): void;
}>();

// v9: pass refs/computeds directly, the adapter keeps the table reactive.
// Sorting state is managed internally by rowSortingFeature.
const table = useTable<typeof tableFeaturesConfig, TData>({
  features: tableFeaturesConfig,
  columns: toRef(props, "columns"),
  data: toRef(props, "data"),
});

const currentItemsCount = computed(() => props.data?.length ?? 0);

const start = computed(() =>
  props.totalItems > 0
    ? (props.page - 1) * props.limit + 1
    : currentItemsCount.value > 0
      ? 1
      : 0,
);

const end = computed(() =>
  props.totalItems > 0
    ? Math.min(props.page * props.limit, props.totalItems)
    : currentItemsCount.value,
);

const showPagination = computed(
  () =>
    !props.isLoading &&
    props.showPaginationControls &&
    (props.totalPages > 1 || props.totalItems > props.limit),
);

const skeletonRows = computed(() => (props.limit > 10 ? 6 : props.limit));
</script>

<template>
  <div
    class="bg-white border border-zinc-200 rounded-lg overflow-hidden font-sans w-full"
  >
    <!-- Header -->
    <div
      v-if="title || href"
      class="flex items-center justify-between px-4 sm:px-5 py-4 border-b border-zinc-100"
    >
      <h2 class="text-base font-bold text-zinc-900">{{ title }}</h2>
      <RouterLink
        v-if="href"
        :to="href"
        class="flex items-center gap-1.5 text-xs font-semibold text-amber-600 hover:text-amber-700 transition-colors cursor-pointer"
      >
        View all
        <ArrowRight class="size-4" />
      </RouterLink>
    </div>

    <div class="overflow-x-auto">
      <table class="w-full text-sm">
        <thead>
          <tr
            v-for="headerGroup in table.getHeaderGroups()"
            :key="headerGroup.id"
            class="border-b border-zinc-100"
          >
            <th
              v-for="header in headerGroup.headers"
              :key="header.id"
              class="text-left px-4 sm:px-5 py-3 text-xs font-semibold text-zinc-400 uppercase tracking-wider whitespace-nowrap"
            >
              <div
                v-if="!header.isPlaceholder"
                :class="
                  twMerge(
                    'group flex items-center gap-1.5',
                    header.column.getCanSort() &&
                      'cursor-pointer select-none hover:text-zinc-600 transition-colors',
                  )
                "
                @click="header.column.getToggleSortingHandler()?.($event)"
              >
                <FlexRender :header="header" />

                <ChevronUp
                  v-if="header.column.getIsSorted() === 'asc'"
                  class="size-4"
                />
                <ChevronDown
                  v-else-if="header.column.getIsSorted() === 'desc'"
                  class="size-4"
                />
                <ChevronDown
                  v-else-if="header.column.getCanSort()"
                  class="size-4 opacity-0 group-hover:opacity-50"
                />
              </div>
            </th>
          </tr>
        </thead>

        <tbody class="divide-y divide-zinc-50">
          <!-- Loading skeleton -->
          <template v-if="isLoading">
            <tr
              v-for="i in skeletonRows"
              :key="i"
              class="border-b border-zinc-50"
            >
              <td v-for="(_, j) in columns" :key="j" class="px-4 sm:px-5 py-4">
                <div
                  :class="
                    twMerge(
                      'h-4 rounded bg-zinc-100 animate-pulse',
                      j === 0 ? 'w-32' : 'w-16',
                    )
                  "
                />
              </td>
            </tr>
          </template>

          <!-- Empty state -->
          <tr v-else-if="table.getRowModel().rows.length === 0">
            <td :colspan="columns.length" class="py-16 text-center px-4">
              <slot name="emptyIcon">
                <Inbox class="size-12 text-zinc-300 mx-auto" />
              </slot>
              <p class="text-zinc-500 font-semibold mt-3">
                {{ emptyStateTitle }}
              </p>
              <p class="text-zinc-400 text-sm mt-1">
                {{ emptyStateDescription }}
              </p>
              <div v-if="showClearFilters" class="mt-4 flex justify-center">
                <CustomButton
                  variant="outline"
                  theme="neutral"
                  size="sm"
                  @click="emit('clearFilters')"
                >
                  Clear filters
                </CustomButton>
              </div>
            </td>
          </tr>

          <!-- Rows -->
          <template v-else>
            <tr
              v-for="row in table.getRowModel().rows"
              :key="row.id"
              class="hover:bg-zinc-50/60 transition-colors"
            >
              <td
                v-for="cell in row.getAllCells()"
                :key="cell.id"
                class="px-4 sm:px-5 py-4"
              >
                <FlexRender :cell="cell" />
              </td>
            </tr>
          </template>
        </tbody>
      </table>
    </div>

    <!-- Pagination footer -->
    <div
      v-if="showPagination"
      class="flex flex-col-reverse sm:flex-row sm:items-center justify-between gap-4 px-4 sm:px-5 py-4 border-t border-zinc-100 select-none"
    >
      <p class="text-xs sm:text-sm text-zinc-500 text-center sm:text-left">
        Showing
        <span class="font-semibold text-zinc-900">{{ start }}–{{ end }}</span>
        {{ totalItems > 0 ? `of ${totalItems.toLocaleString()}` : "" }} items
      </p>

      <div
        class="flex items-center justify-between sm:justify-end gap-2 w-full sm:w-auto"
      >
        <CustomButton
          variant="outline"
          theme="neutral"
          size="sm"
          class="flex-1 sm:flex-none"
          :disabled="page <= 1"
          @click="emit('pageChange', page - 1)"
        >
          Previous
        </CustomButton>

        <span
          class="text-xs sm:text-sm text-zinc-500 px-2 min-w-12 text-center font-medium"
        >
          {{ page }} / {{ totalPages || 1 }}
        </span>

        <CustomButton
          variant="outline"
          theme="neutral"
          size="sm"
          class="flex-1 sm:flex-none"
          :disabled="page >= (totalPages || 1)"
          @click="emit('pageChange', page + 1)"
        >
          Next
        </CustomButton>
      </div>
    </div>
  </div>
</template>
