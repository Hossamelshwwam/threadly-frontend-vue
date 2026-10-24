<template>
  <div
    v-if="isLoading"
    class="py-32 text-center text-zinc-500 font-medium flex-1"
  >
    Loading...
  </div>

  <div
    v-else-if="!itemToReview"
    class="py-20 text-center text-zinc-500 font-medium flex-1"
  >
    Item not found or already reviewed.
    <br />
    <RouterLink
      to="/account/reviews/pending"
      class="text-amber-600 underline mt-2 block"
    >
      Go back
    </RouterLink>
  </div>

  <div v-else class="flex-1 font-sans animate-fadeIn pb-12 max-w-3xl">
    <RouterLink
      to="/account/reviews/pending"
      class="mb-6 inline-flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-zinc-400 transition-colors hover:text-amber-600"
    >
      <ArrowLeft :size="18" /> Cancel Review
    </RouterLink>

    <div
      class="bg-white border border-zinc-200 rounded-2xl shadow-sm overflow-hidden"
    >
      <!-- Item Context Header -->
      <ReviewItemHeader :item="itemToReview" />

      <!-- Review Form -->
      <form @submit="onSubmit" class="p-6 md:p-8 space-y-8">
        <!-- 1. Star Rating -->
        <StarRatingInput
          :value="rating"
          @change="handleRatingChange"
          :error="errors.rating"
        />

        <!-- 2. Written Comment -->
        <div>
          <label
            class="block text-sm font-black text-zinc-900 mb-3 uppercase tracking-wider"
          >
            Your Review *
          </label>
          <textarea
            v-model="comment"
            v-bind="commentAttrs"
            rows="5"
            placeholder="What did you like or dislike? How did it fit?"
            class="w-full px-4 py-3 bg-zinc-50 border border-zinc-200 rounded-xl text-zinc-900 font-medium placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all resize-none"
          />
          <p v-if="errors.comment" class="text-red-500 text-xs font-bold mt-2">
            {{ errors.comment }}
          </p>
        </div>

        <!-- 3. Image Upload (Max 5) -->
        <ReviewImagesUpload
          :images="images"
          @add-files="handleAddFiles"
          @remove-image="handleRemoveImage"
        />

        <div class="pt-6 border-t border-zinc-100">
          <CustomButton
            type="submit"
            variant="solid"
            theme="primary"
            full-width
            :disabled="isSubmitting"
            class="h-14 text-lg font-black rounded-xl shadow-md"
          >
            {{ isSubmitting ? "Publishing Review..." : "Publish Review" }}
          </CustomButton>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import { useRouter } from "vue-router";
import { useForm } from "vee-validate";
import { toTypedSchema } from "@vee-validate/zod";
import { toast } from "vue-sonner";
import type { AxiosError } from "axios";
import { ArrowLeft } from "lucide-vue-next";

import { usePendingReviews, useSubmitReview } from "../hooks/useReviews";
import { reviewSchema, type ReviewInput } from "../schemas/review.schema";
import ReviewItemHeader from "../components/write-review/ReviewItemHeader.vue";
import StarRatingInput from "../components/write-review/StarRatingInput.vue";
import ReviewImagesUpload from "../components/write-review/ReviewImagesUpload.vue";
import CustomButton from "@/shared/components/custom-button/CustomButton.vue";

const props = defineProps<{
  orderItemId: string;
}>();

const router = useRouter();
const images = ref<File[]>([]);

const { data: response, isLoading } = usePendingReviews();
const { mutateAsync: submitReviewAsync, isPending: isSubmitting } =
  useSubmitReview();

const { defineField, errors, handleSubmit } = useForm<ReviewInput>({
  validationSchema: toTypedSchema(reviewSchema),
  initialValues: { rating: 0 },
});

const [rating] = defineField("rating");
const [comment, commentAttrs] = defineField("comment");

// Find the exact item they clicked on
const itemToReview = computed(() =>
  response.value?.data?.find((item) => item._id === props.orderItemId),
);

const handleRatingChange = (value: number) => {
  rating.value = value;
};

const handleAddFiles = (files: File[]) => {
  images.value = [...images.value, ...files];
};

const handleRemoveImage = (index: number) => {
  images.value = images.value.filter((_, i) => i !== index);
};

const onSubmit = handleSubmit((data) => {
  const formData = new FormData();
  formData.append("orderItemId", props.orderItemId);
  formData.append("rating", data.rating.toString());
  formData.append("comment", data.comment);

  // Append array of files
  images.value.forEach((img) => formData.append("images", img));

  toast.promise(submitReviewAsync(formData), {
    loading: "Submitting your review...",
    success: () => {
      router.push("/account/reviews/pending");
      return "Review submitted successfully! Thank you.";
    },
    error: (err: AxiosError<{ message: string }>) =>
      err.response?.data?.message || "Failed to submit review.",
  });
});
</script>

<style scoped></style>
