<template>
  <section v-if="totalReviews === 0" class="pt-12">
    <div
      class="flex flex-col items-center justify-center p-16 text-center bg-zinc-50 border border-zinc-100 rounded-[2rem]"
    >
      <h2 class="mb-3 text-2xl font-black text-zinc-950">No Reviews Yet</h2>
      <p class="text-zinc-500 font-medium">
        Have you purchased this? Be the first to share your thoughts!
      </p>
    </div>
  </section>

  <section v-else id="reviews" class="pt-12">
    <!-- 1. Horizontal Dashboard Summary -->
    <div
      class="mb-12 flex flex-col lg:flex-row items-center justify-between gap-10 rounded-[2rem] bg-amber-50 p-8 sm:p-10 border border-amber-100/50"
    >
      <!-- Score Block -->
      <div
        class="flex flex-col items-center lg:items-start shrink-0 text-center lg:text-left"
      >
        <h2
          class="text-xs font-black uppercase tracking-widest text-amber-700 mb-6"
        >
          Customer Feedback
        </h2>
        <div
          class="flex flex-col sm:flex-row items-center sm:items-end gap-4 sm:gap-6"
        >
          <span
            class="text-7xl sm:text-8xl font-black text-zinc-950 leading-none tracking-tighter"
          >
            {{ averageRating.toFixed(1) }}
          </span>
          <div class="flex flex-col gap-1.5 pb-2">
            <Stars :rating="averageRating" :size="22" />
            <span class="text-sm font-bold text-zinc-500">
              Based on {{ totalReviews }} reviews
            </span>
          </div>
        </div>
      </div>

      <!-- Divider -->
      <div class="hidden lg:block w-px h-32 bg-amber-200/50 mx-4" />

      <!-- Progress Bars -->
      <div class="flex-1 w-full max-w-md">
        <div
          v-for="star in (['5', '4', '3', '2', '1'] as const)"
          :key="star"
          class="flex items-center gap-4 text-sm mb-2.5 last:mb-0"
        >
          <span class="font-bold text-zinc-700 w-14">{{ star }} Stars</span>
          <div
            class="flex-1 h-2 bg-amber-200/50 rounded-full overflow-hidden"
          >
            <div
              class="h-full bg-amber-500 rounded-full transition-all duration-700 ease-out"
              :style="{ width: `${barPct(star)}%` }"
            />
          </div>
          <span class="font-medium text-zinc-500 w-8 text-right">{{
            breakdown[star]
          }}</span>
        </div>
      </div>
    </div>

    <!-- 2. Review Testimonial Grid -->
    <div class="grid md:grid-cols-2 gap-6 lg:gap-8">
      <div
        v-for="review in reviews.slice(0, 6)"
        :key="review._id"
        class="group relative flex flex-col rounded-3xl bg-white p-8 border border-zinc-100 shadow-sm transition-all hover:shadow-md hover:border-amber-200"
      >
        <!-- Decorative Quote Mark -->
        <div
          class="absolute top-6 right-8 text-zinc-50 transition-colors group-hover:text-amber-50"
        >
          <Quote :size="64" />
        </div>

        <!-- Reviewer Info -->
        <div class="relative flex items-center gap-4 mb-6 z-10">
          <div
            class="size-10 rounded-full bg-main text-white flex items-center justify-center font-black text-lg shadow-sm"
          >
            {{ review.buyerId.name.charAt(0).toUpperCase() }}
          </div>
          <div class="flex flex-col">
            <span class="text-base font-bold text-zinc-950">
              {{ review.buyerId.name }}
            </span>
            <div class="flex items-center gap-2 mt-0.5">
              <Stars :rating="review.rating" :size="14" />
              <span class="text-xs font-bold text-zinc-400">
                •
                {{
                  new Date(review.createdAt).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })
                }}
              </span>
            </div>
          </div>
        </div>

        <!-- Review Text -->
        <p
          class="relative z-10 text-zinc-600 leading-relaxed text-pretty flex-1"
        >
          {{ review.comment }}
        </p>

        <!-- Uploaded Images -->
        <div
          v-if="review.images && review.images.length > 0"
          class="relative z-10 flex flex-wrap gap-3 mt-6 pt-6 border-t border-zinc-50"
        >
          <div
            v-for="(img, i) in review.images"
            :key="i"
            class="relative w-16 h-16 rounded-xl overflow-hidden bg-zinc-100 border border-zinc-200"
          >
            <img
              :src="img"
              :alt="`Review attached image ${i + 1}`"
              class="h-full w-full object-cover"
            />
          </div>
        </div>
      </div>
    </div>

    <!-- 3. See More -->
    <div v-if="reviews.length > 6" class="mt-10 flex justify-center">
      <button
        class="rounded-full border-2 border-zinc-200 bg-white px-8 py-3 text-sm font-bold text-zinc-600 transition-all hover:border-amber-500 hover:text-amber-600"
      >
        Load More Reviews
      </button>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { Quote } from "lucide-vue-next";
import Stars from "@/domains/storefront/components/shared/Stars.vue";
import type {
  Review,
  ReviewRatingBreakdown,
} from "@/domains/reviews/types/review.types";

interface ReviewsSectionProps {
  reviews: Review[];
  averageRating: number;
  totalReviews: number;
  ratingBreakdown?: ReviewRatingBreakdown;
}

const props = defineProps<ReviewsSectionProps>();

const breakdown = computed<ReviewRatingBreakdown>(() => {
  if (props.ratingBreakdown) return props.ratingBreakdown;
  const b: ReviewRatingBreakdown = { "5": 0, "4": 0, "3": 0, "2": 0, "1": 0 };
  for (const r of props.reviews) {
    const key = String(r.rating) as keyof ReviewRatingBreakdown;
    if (key in b) b[key]++;
  }
  return b;
});

const maxCount = computed(() => Math.max(...Object.values(breakdown.value), 1));

function barPct(star: keyof ReviewRatingBreakdown) {
  return maxCount.value > 0
    ? (breakdown.value[star] / maxCount.value) * 100
    : 0;
}
</script>

<style scoped></style>
