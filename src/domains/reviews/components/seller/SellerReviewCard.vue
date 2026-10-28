<template>
  <div
    class="p-5 transition-colors hover:bg-zinc-50/50 border-b border-zinc-100 last:border-b-0 bg-white rounded-lg"
  >
    <div class="flex gap-4">
      <!-- Product Image -->
      <RouterLink
        :to="`/seller/products/${review.productId._id}`"
        class="shrink-0"
      >
        <div
          class="w-16 h-16 rounded-lg bg-zinc-100 border border-zinc-200 overflow-hidden"
        >
          <img
            v-if="productImage"
            :src="productImage"
            :alt="review.productId.name"
            width="64"
            height="64"
            class="w-full h-full object-cover"
          />
          <div
            v-else
            class="w-full h-full flex items-center justify-center text-lg font-bold text-zinc-300"
          >
            {{ review.productId.name.charAt(0) }}
          </div>
        </div>
      </RouterLink>

      <div class="flex-1 min-w-0">
        <!-- Product Name & Date -->
        <div class="flex items-start justify-between gap-2 mb-1.5">
          <RouterLink
            :to="`/seller/products/${review.productId._id}`"
            class="text-sm font-bold text-main hover:text-main-warm hover:underline truncate"
          >
            {{ review.productId.name }}
          </RouterLink>
          <p class="text-[11px] text-zinc-400 whitespace-nowrap shrink-0 pt-0.5">
            {{ formattedDate }}
          </p>
        </div>

        <!-- Buyer Info -->
        <div class="flex items-center gap-2 mb-2">
          <div
            class="w-5 h-5 rounded-full bg-zinc-200 flex items-center justify-center text-[9px] font-bold text-zinc-600 uppercase"
          >
            {{ review.buyerId?.name?.charAt(0) || "U" }}
          </div>
          <span class="text-xs font-medium text-zinc-600">
            {{ review.buyerId?.name || "Anonymous" }}
          </span>
        </div>

        <!-- Stars -->
        <div class="flex items-center gap-0.5 mb-2.5">
          <Star
            v-for="i in 5"
            :key="i"
            :size="14"
            :class="i <= review.rating ? 'text-amber-400' : 'text-zinc-200'"
            fill="currentColor"
          />
        </div>

        <!-- Comment -->
        <p class="text-sm text-zinc-700 leading-relaxed">
          {{ review.comment }}
        </p>

        <!-- Images -->
        <div v-if="review.images && review.images.length > 0" class="flex flex-wrap gap-2 mt-3">
          <img
            v-for="(img, i) in review.images"
            :key="i"
            :src="img"
            :alt="`Review image ${i + 1}`"
            class="w-14 h-14 object-cover rounded-lg border border-zinc-200"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { Star } from "lucide-vue-next";
import type { SellerReview } from "../../types/review.types";

const props = defineProps<{
  review: SellerReview;
}>();

const productImage = computed(() => props.review.productId.images?.[0]);

const formattedDate = computed(() =>
  new Date(props.review.createdAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  }),
);
</script>
