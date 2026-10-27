<template>
  <div class="space-y-4">
    <!-- Featured Cover Image -->
    <div
      v-if="mainImage"
      class="w-full aspect-square sm:aspect-video md:aspect-[21/9] relative rounded-xl overflow-hidden border border-zinc-200 group shadow-sm bg-zinc-50"
    >
      <img
        :src="mainImage"
        alt="Cover"
        class="object-contain sm:object-cover h-full w-full"
        loading="eager"
      />

      <!-- Desktop Hover Overlay -->
      <div
        class="hidden sm:flex absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity items-center justify-center backdrop-blur-sm z-10"
      >
        <ConfirmationDialog
          :on-confirm="removeCover"
          title="Remove Cover Image"
          description="Remove this cover image? The next image will become the cover."
          confirm-text="Delete"
          variant="danger"
        >
          <button
            class="bg-white/90 text-error px-4 py-2 rounded-lg font-bold text-sm shadow-xl flex items-center gap-2 hover:bg-white transition-colors cursor-pointer disabled:opacity-50"
          >
            <CircleX :size="18" /> Remove Cover
          </button>
        </ConfirmationDialog>
      </div>

      <!-- Mobile Delete Button (Always visible on mobile, hidden on desktop) -->
      <div class="absolute bottom-3 right-3 sm:hidden z-20">
        <ConfirmationDialog
          :on-confirm="removeCover"
          title="Remove Cover Image"
          description="Remove this cover image? The next image will become the cover."
          confirm-text="Delete"
          variant="danger"
        >
          <button
            class="bg-white text-error p-2.5 rounded-full shadow-lg flex items-center justify-center border border-zinc-100"
          >
            <Trash2 :size="20" />
          </button>
        </ConfirmationDialog>
      </div>

      <div
        class="absolute top-3 left-3 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold text-zinc-800 shadow-sm z-20"
      >
        Cover Image
      </div>
    </div>

    <div
      v-else
      class="w-full aspect-square sm:aspect-video md:aspect-[21/9] rounded-xl border-2 border-dashed border-zinc-300 bg-zinc-50 flex flex-col items-center justify-center text-zinc-400"
    >
      <CloudUpload :size="40" class="text-zinc-300 mb-2" />
      <p class="text-sm font-medium">No cover image uploaded</p>
    </div>

    <!-- Thumbnails & Upload Button -->
    <!-- Scrollbar-hide keeps it clean on mobile while allowing native swiping -->
    <div class="flex gap-3 overflow-x-auto pb-2 scrollbar-hide items-center">
      <div
        v-for="(img, i) in thumbnails"
        :key="i"
        class="min-w-24 w-24 sm:min-w-28 sm:w-28 aspect-square relative rounded-lg overflow-hidden border border-zinc-200 group shrink-0 bg-white shadow-sm"
      >
        <img
          :src="img"
          :alt="`Thumbnail ${i + 1}`"
          class="object-cover h-full w-full"
        />

        <!-- Delete Action (Top right corner - visible on mobile, hover on desktop) -->
        <div
          class="absolute top-1.5 right-1.5 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity z-10"
        >
          <ConfirmationDialog
            :on-confirm="() => handleDelete(img)"
            title="Delete Image"
            description="Remove this image?"
            confirm-text="Delete"
            variant="danger"
          >
            <button
              class="bg-white/90 backdrop-blur text-error p-1.5 rounded-full shadow-sm hover:bg-white hover:text-red-600 transition-colors cursor-pointer"
              title="Delete"
            >
              <Trash2 :size="16" />
            </button>
          </ConfirmationDialog>
        </div>
      </div>

      <!-- Upload Trigger -->
      <button
        v-if="images.length < 8"
        @click="fileInputRef?.click()"
        :disabled="isUploading || isDeleting"
        :class="
          cn(
            'min-w-24 w-24 sm:min-w-28 sm:w-28 aspect-square rounded-lg border-2 border-dashed border-zinc-300 bg-zinc-50 flex flex-col items-center justify-center gap-1.5 text-zinc-500 flex-shrink-0 transition-colors',
            isUploading || isDeleting
              ? 'opacity-50 cursor-not-allowed'
              : 'hover:bg-amber-50 hover:border-amber-300 hover:text-amber-600 cursor-pointer',
          )
        "
      >
        <LoaderCircle
          v-if="isUploading"
          :size="24"
          class="animate-spin text-2xl"
        />
        <CloudUpload v-else :size="24" class="text-2xl" />
        <span
          class="text-[10px] font-bold uppercase tracking-wider text-center px-1"
        >
          {{ isUploading ? "Uploading..." : "Add Image" }}
        </span>
      </button>

      <input
        ref="fileInputRef"
        type="file"
        @change="onFileChange"
        accept="image/png, image/jpeg, image/webp"
        multiple
        class="hidden"
        :disabled="isUploading || isDeleting"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import { toast } from "vue-sonner";
import { CircleX, CloudUpload, LoaderCircle, Trash2 } from "lucide-vue-next";

import {
  useUploadProductImages,
  useDeleteProductImage,
} from "../../hooks/useProducts";
import ConfirmationDialog from "@/shared/components/confirmation-dialog/ConfirmationDialog.vue";
import { cn } from "@/shared/lib/utils";

const props = withDefaults(
  defineProps<{
    productId: string;
    images?: string[];
  }>(),
  {
    images: () => [],
  },
);

const fileInputRef = ref<HTMLInputElement | null>(null);
const { mutateAsync: uploadImagesAsync, isPending: isUploading } =
  useUploadProductImages();
const { mutateAsync: deleteImageAsync, isPending: isDeleting } =
  useDeleteProductImage();

const handleFiles = (filesList: FileList | null) => {
  if (!filesList || filesList.length === 0) return;
  const incomingFiles = Array.from(filesList);

  // Clear the input so the same files can be selected again if needed
  if (fileInputRef.value) fileInputRef.value.value = "";

  if (props.images.length + incomingFiles.length > 8) {
    toast.error("You can only upload up to 8 images per product.");
    return;
  }

  toast.promise(uploadImagesAsync({ id: props.productId, files: incomingFiles }), {
    loading: "Uploading images...",
    success: "Images added to your gallery.",
    error: "Failed to upload images.",
  });
};

const onFileChange = (e: Event) => {
  handleFiles((e.target as HTMLInputElement).files);
};

const handleDelete = (url: string) => {
  toast.promise(deleteImageAsync({ id: props.productId, imageUrl: url }), {
    loading: "Removing image...",
    success: "Image removed successfully.",
    error: "Failed to remove image.",
  });
};

const removeCover = () => {
  if (mainImage.value) handleDelete(mainImage.value);
};

const mainImage = computed(() => props.images[0]);
const thumbnails = computed(() => props.images.slice(1));
</script>
