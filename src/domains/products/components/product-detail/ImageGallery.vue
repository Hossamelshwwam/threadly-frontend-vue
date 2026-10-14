<template>
  <div
    v-if="images.length === 0"
    class="flex aspect-[4/5] w-full flex-col items-center justify-center rounded-3xl border border-zinc-200 bg-zinc-100 text-zinc-400"
  >
    <Image :size="48" class="mb-4 opacity-50" />
    <span class="text-sm font-medium">No image available</span>
  </div>

  <div v-else class="flex flex-col gap-4">
    <!-- Main Image Container -->
    <div
      @click="openGallery()"
      class="group relative w-full aspect-[4/5] cursor-zoom-in overflow-hidden rounded-3xl border border-zinc-200 bg-zinc-100"
    >
      <img
        :src="images[activeIndex]"
        :alt="productName"
        class="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
      />

      <!-- Hover Hint Icon -->
      <div
        class="absolute bottom-6 right-6 flex h-12 w-12 items-center justify-center rounded-full bg-white/90 text-zinc-900 opacity-0 shadow-lg backdrop-blur-md transition-all duration-300 group-hover:scale-110 group-hover:opacity-100"
      >
        <ZoomIn :size="24" />
      </div>
    </div>

    <!-- Thumbnails (5 Columns) -->
    <div v-if="images.length > 1" class="grid grid-cols-5 gap-3">
      <button
        v-for="(img, i) in visibleThumbnails"
        :key="i"
        @click="selectThumbnail(i)"
        :aria-label="
          isLastAndMore(i)
            ? `View ${remainingCount} more images`
            : `View image ${i + 1}`
        "
        :class="[
          'relative aspect-[3/4] w-full overflow-hidden rounded-xl border-2 transition-all duration-300',
          i === activeIndex && !isLastAndMore(i)
            ? 'border-amber-500 opacity-100 shadow-md ring-2 ring-amber-500/20'
            : 'border-transparent opacity-60 hover:border-zinc-300 hover:opacity-100',
        ]"
      >
        <img
          :src="img"
          :alt="`${productName} thumbnail ${i + 1}`"
          class="h-full w-full object-cover"
        />

        <!-- Dark Overlay for +X Remaining Images -->
        <div
          v-if="isLastAndMore(i)"
          class="absolute inset-0 z-10 flex items-center justify-center bg-zinc-950/60 text-lg font-black text-white backdrop-blur-sm transition-colors hover:bg-zinc-950/70"
        >
          +{{ remainingCount }}
        </div>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import { Image, ZoomIn } from "lucide-vue-next";
import { Fancybox } from "@fancyapps/ui";
import "@fancyapps/ui/dist/fancybox/fancybox.css";

interface ImageGalleryProps {
  images: string[];
  productName: string;
}

const props = defineProps<ImageGalleryProps>();

const activeIndex = ref(0);

// Logic for the 5-column thumbnail grid
const MAX_THUMBNAILS = 5;
const remainingCount = computed(() => props.images.length - MAX_THUMBNAILS);
const visibleThumbnails = computed(() => props.images.slice(0, MAX_THUMBNAILS));

function isLastAndMore(i: number) {
  return i === MAX_THUMBNAILS - 1 && remainingCount.value > 0;
}

// Use Fancybox programmatic API to open the gallery
function openGallery(startIndex = activeIndex.value) {
  Fancybox.show(
    props.images.map((src) => ({
      src,
      type: "image",
    })),
    {
      startIndex,
      Carousel: {
        infinite: false,
      },
    },
  );
}

function selectThumbnail(i: number) {
  if (isLastAndMore(i)) {
    // Open Fancybox starting at the first hidden image
    openGallery(MAX_THUMBNAILS - 1);
  } else {
    activeIndex.value = i;
  }
}
</script>

<style scoped></style>
