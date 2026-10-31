<template>
  <div
    class="bg-white border border-zinc-200 rounded-lg p-5 space-y-4 shadow-xs font-sans"
  >
    <div>
      <h2 class="text-sm font-bold text-zinc-900">
        Asset Media Gallery Management
      </h2>
      <p class="text-xs text-on-surface-muted mt-0.5">
        Upload product showcases or variant previews. Maximum of 8 images
        allowed.
      </p>
    </div>

    <!-- Grid Canvas Gallery View Wrapper -->
    <div class="grid grid-cols-2 sm:grid-cols-4 gap-4">
      <ProductImageTile
        v-for="(img, i) in images"
        :key="i"
        :src="img"
        :index="i"
        :disabled="isBusy"
        @remove="handleDelete"
      />

      <!-- Dynamic Placeholder Blocks up to limit -->
      <ProductImagesEmptyState v-if="images.length === 0" />
    </div>

    <!-- Interactive Drag & Drop Active Dropzone Container Layer -->
    <ProductImageDropzone
      v-if="images.length < 8"
      :disabled="isBusy"
      :is-uploading="isUploading"
      :remaining="8 - images.length"
      @select="handleFiles"
    />

    <div
      v-else
      class="p-3.5 bg-warning-bg border border-warning/20 rounded-md text-center"
    >
      <p class="text-xs font-semibold text-warning">
        Maximum gallery threshold achieved. Delete existing items to add new
        images.
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { toast } from "vue-sonner";
import type { AxiosError } from "axios";

import {
  useUploadProductImages,
  useDeleteProductImage,
} from "../../hooks/useProducts";
import ProductImageTile from "./ProductImageTile.vue";
import ProductImagesEmptyState from "./ProductImagesEmptyState.vue";
import ProductImageDropzone from "./ProductImageDropzone.vue";

const props = withDefaults(
  defineProps<{
    productId: string;
    images?: string[];
  }>(),
  {
    images: () => [],
  },
);

const { mutateAsync: uploadImagesAsync, isPending: isUploading } =
  useUploadProductImages();
const { mutateAsync: deleteImageAsync, isPending: isDeleting } =
  useDeleteProductImage();

// Any in-flight asset request locks the gallery controls.
const isBusy = computed(() => isUploading.value || isDeleting.value);

const handleFiles = (filesList: FileList | null) => {
  if (!filesList || filesList.length === 0) return;

  const incomingFiles = Array.from(filesList);

  // Safety check against backend threshold criteria
  if (props.images.length + incomingFiles.length > 8) {
    toast.error(
      `Platform limit exceeded. A single product is capped at 8 assets total.`,
    );
    return;
  }

  toast.promise(
    uploadImagesAsync({ id: props.productId, files: incomingFiles }),
    {
      loading: "Uploading product media assets to cloud storage...",
      success: "Images uploaded and synchronized successfully.",
      error: (error: AxiosError<{ message: string }>) =>
        error.response?.data?.message ||
        "Failed to process image files upload.",
    },
  );
};

const handleDelete = (url: string) => {
  toast.promise(deleteImageAsync({ id: props.productId, imageUrl: url }), {
    loading: "Removing product media record...",
    success: "Image successfully deleted from listing assets.",
    error: (error: AxiosError<{ message: string }>) =>
      error.response?.data?.message || "Failed to drop image selection.",
  });
};
</script>
