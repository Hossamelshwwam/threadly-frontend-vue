<template>
  <div>
    <label
      class="block text-sm font-black text-zinc-900 mb-1 uppercase tracking-wider"
    >
      Add Photos
    </label>
    <p class="text-xs font-semibold text-zinc-500 mb-3">
      Upload up to {{ MAX_IMAGES }} images (Optional)
    </p>

    <div class="flex flex-wrap gap-4">
      <div
        v-for="(img, idx) in images"
        :key="idx"
        class="relative w-24 h-24 rounded-xl overflow-hidden border border-zinc-200 group"
      >
        <img
          :src="previews[idx]"
          :alt="`Upload ${idx}`"
          class="absolute inset-0 h-full w-full object-cover"
        />
        <button
          type="button"
          @click="emit('removeImage', idx)"
          class="absolute top-1 right-1 text-white bg-black/50 rounded-full p-0.5 opacity-0 group-hover:opacity-100 transition-opacity"
        >
          <CircleX :size="20" />
        </button>
      </div>

      <label
        v-if="images.length < MAX_IMAGES"
        class="w-24 h-24 rounded-xl border-2 border-dashed border-zinc-300 bg-zinc-50 flex flex-col items-center justify-center text-zinc-400 hover:text-amber-500 hover:border-amber-400 hover:bg-amber-50 cursor-pointer transition-colors"
      >
        <ImagePlus :size="28" />
        <span class="text-[10px] font-bold mt-1">Add Photo</span>
        <input
          type="file"
          multiple
          accept="image/*"
          class="hidden"
          @change="handleImageUpload"
        />
      </label>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onBeforeUnmount, ref, watch } from "vue";
import { toast } from "vue-sonner";
import { CircleX, ImagePlus } from "lucide-vue-next";

const MAX_IMAGES = 5;

const props = defineProps<{
  images: File[];
}>();

const emit = defineEmits<{
  (e: "addFiles", files: File[]): void;
  (e: "removeImage", index: number): void;
}>();

// Object URLs for the local previews — created per image and revoked when the
// selection changes, so nothing is uploaded before submit.
const previews = ref<string[]>([]);

const revokePreviews = () => {
  previews.value.forEach((url) => URL.revokeObjectURL(url));
  previews.value = [];
};

watch(
  () => props.images,
  (images) => {
    revokePreviews();
    previews.value = images.map((img) => URL.createObjectURL(img));
  },
  { immediate: true },
);

onBeforeUnmount(revokePreviews);

const handleImageUpload = (e: Event) => {
  const files = Array.from((e.target as HTMLInputElement).files || []);
  if (props.images.length + files.length > MAX_IMAGES) {
    toast.error(`You can only upload up to ${MAX_IMAGES} images.`);
    return;
  }
  emit("addFiles", files);
};
</script>

<style scoped></style>
