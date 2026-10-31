<template>
  <div class="p-6 transition-colors hover:bg-zinc-50/50">
    <div class="flex justify-between items-start gap-4">
      <!-- User Info & Rating -->
      <div>
        <div class="flex items-center gap-2 mb-2">
          <div
            class="w-8 h-8 rounded-full bg-zinc-200 flex items-center justify-center text-xs font-bold text-zinc-600 uppercase"
          >
            {{ review.buyerId?.name?.charAt(0) || "U" }}
          </div>
          <div>
            <p class="text-sm font-bold text-zinc-900">
              {{ review.buyerId?.name || "Anonymous User" }}
            </p>
            <p class="text-[10px] text-zinc-400">
              {{
                new Date(review.createdAt).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                })
              }}
            </p>
          </div>
        </div>

        <!-- Stars -->
        <div class="flex items-center gap-0.5 mb-3 text-amber-400">
          <Star
            v-for="i in 5"
            :key="i"
            :class="i - 1 < review.rating ? 'text-amber-400' : 'text-zinc-200'"
            :size="14"
            fill="currentColor"
          />
        </div>

        <!-- Comment -->
        <p class="text-sm text-zinc-700 leading-relaxed max-w-3xl">
          {{ review.comment }}
        </p>

        <!-- Attached Images -->
        <div
          v-if="review.images && review.images.length > 0"
          class="flex items-center gap-2 mt-4"
        >
          <div
            v-for="(img, idx) in review.images"
            :key="idx"
            class="relative w-16 h-16 rounded-md overflow-hidden border border-zinc-200"
          >
            <img
              :src="img"
              alt="Review attachment"
              class="object-cover h-full w-full"
            />
          </div>
        </div>
      </div>

      <!-- Admin Delete Action -->
      <ConfirmationDialog
        title="Delete Review"
        description="Are you sure you want to permanently delete this customer review? This action cannot be undone."
        confirm-text="Delete Review"
        variant="danger"
        :on-confirm="() => emit('delete', review._id)"
      >
        <CustomButton
          variant="soft"
          theme="danger"
          size="sm"
          class="shrink-0"
          :left-icon="TrashIcon"
          :loading="isRowDeleting"
        >
          Remove
        </CustomButton>
      </ConfirmationDialog>
    </div>
  </div>
</template>

<script setup lang="ts">
import { h } from "vue";
import { Star, Trash2 } from "lucide-vue-next";

import type { Review } from "../../types/review.types";
import CustomButton from "@/shared/components/custom-button/CustomButton.vue";
import ConfirmationDialog from "@/shared/components/confirmation-dialog/ConfirmationDialog.vue";

defineProps<{
  review: Review;
  isRowDeleting: boolean;
}>();

const emit = defineEmits<{
  delete: [reviewId: string];
}>();

const TrashIcon = () => h(Trash2, { size: 14 });
</script>
