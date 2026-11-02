<template>
  <div class="flex items-center gap-3 font-sans min-w-[200px]">
    <!-- FIX: Scaled down slightly on mobile (w-16 h-16) to save space, back to w-20 on tablet -->
    <div
      class="w-16 h-16 sm:w-20 sm:h-20 rounded bg-zinc-50 border border-zinc-200 flex items-center justify-center shrink-0 overflow-hidden relative group/img shadow-sm"
    >
      <img
        v-if="category.image"
        :src="category.image"
        :alt="category.name"
        class="object-cover h-full w-full group-hover/img:opacity-30 transition-opacity"
      />
      <Folder
        v-else
        :size="18"
        class="text-zinc-400 text-lg group-hover/img:opacity-0 transition-opacity"
      />

      <!-- FIX 1: Desktop Hover Overlay (Hidden on Mobile) -->
      <button
        type="button"
        @click="fileInput?.click()"
        class="hidden sm:flex absolute inset-0 items-center justify-center opacity-0 group-hover/img:opacity-100 bg-black/10 text-zinc-800 transition-all cursor-pointer z-10"
        title="Upload category artwork banner image"
      >
        <ImagePlus
          :size="20"
          class="text-xl text-amber-500 bg-white p-1.5 rounded-full shadow-sm"
        />
      </button>

      <!-- FIX 2: Mobile Persistent Button (Always visible on touch screens!) -->
      <button
        type="button"
        @click="fileInput?.click()"
        class="sm:hidden absolute bottom-1 right-1 bg-white/90 backdrop-blur-sm p-1 rounded-md shadow-sm border border-zinc-200 z-20"
      >
        <ImagePlus :size="14" class="text-amber-500 text-sm" />
      </button>

      <input
        type="file"
        ref="fileInput"
        @change="handleFileChange"
        accept="image/png, image/jpeg, image/webp"
        class="hidden"
      />
    </div>

    <div class="flex flex-col min-w-0">
      <p class="font-bold text-zinc-900 leading-tight truncate">
        {{ category.name }}
      </p>
      <p class="text-[10px] sm:text-xs font-mono text-zinc-400 mt-0.5 truncate">
        slug: {{ category.slug }}
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { toast } from "vue-sonner";
import type { AxiosError } from "axios";
import { Folder, ImagePlus } from "lucide-vue-next";

import type { Category } from "../types/category.types";

const props = defineProps<{
  category: Category;
  onUploadImage: (id: string, file: File) => Promise<unknown>;
}>();

const fileInput = ref<HTMLInputElement | null>(null);

const handleFileChange = (event: Event) => {
  const input = event.target as HTMLInputElement;
  const file = input.files?.[0];
  if (!file) return;

  toast.promise(props.onUploadImage(props.category._id, file), {
    loading: "Uploading classification asset image...",
    success: "Category image uploaded successfully",
    error: (err: AxiosError<{ message: string }>) =>
      err?.response?.data?.message || "Failed to save category image",
  });

  if (fileInput.value) fileInput.value.value = "";
};
</script>
