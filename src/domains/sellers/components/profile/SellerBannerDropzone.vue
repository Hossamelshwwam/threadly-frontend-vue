<template>
  <div class="flex flex-col gap-3">
    <h4 class="text-sm font-bold text-zinc-900">Store Banner</h4>
    <p class="text-xs text-zinc-500 mb-2">
      This image will appear at the top of your public storefront.
    </p>

    <div
      :class="`relative w-ful h-32 rounded-xl border-2 border-dashed border-zinc-200 bg-zinc-50 flex flex-col items-center justify-center overflow-hidden cursor-pointer hover:border-amber-400 transition-colors group ${isPending ? 'opacity-50 pointer-events-none' : ''}`"
      @click="openFilePicker"
    >
      <div
        v-if="isPending"
        class="flex flex-col items-center gap-2 text-amber-500"
      >
        <LoaderCircle :size="24" class="animate-spin text-2xl" />
        <span class="text-xs font-semibold">Uploading...</span>
      </div>
      <template v-else-if="displayImage">
        <img
          :src="displayImage"
          alt="Store Banner"
          width="500"
          height="128"
          class="object-cover"
        />
        <div
          class="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center"
        >
          <span
            class="text-white text-sm font-bold flex items-center gap-2"
          >
            <ImagePlus :size="18" class="text-lg" /> Change Banner
          </span>
        </div>
      </template>
      <div
        v-else
        class="flex flex-col items-center text-zinc-400 group-hover:text-amber-500 transition-colors"
      >
        <ImagePlus :size="30" class="text-3xl mb-2" />
        <span class="text-sm font-bold text-zinc-600">
          Click to upload banner
        </span>
        <span class="text-xs mt-1">
          1200 x 300px recommended (Max 5MB)
        </span>
      </div>
    </div>

    <input
      ref="fileInputRef"
      type="file"
      accept="image/png, image/jpeg, image/jpg, image/webp"
      class="hidden"
      @change="handleFileChange"
    />
  </div>
</template>

<script setup lang="ts">
import { computed, onUnmounted, ref } from "vue";
import { toast } from "vue-sonner";
import { ImagePlus, LoaderCircle } from "lucide-vue-next";
import { useUploadBranding } from "../../hooks/useUploadBranding";

const props = defineProps<{
  currentBanner?: string;
}>();

const fileInputRef = ref<HTMLInputElement | null>(null);
const preview = ref<string | null>(null);
const { mutateAsync: uploadBranding, isPending } = useUploadBranding();

const openFilePicker = () => {
  if (isPending.value) return;
  fileInputRef.value?.click();
};

const handleFileChange = (e: Event) => {
  const file = (e.target as HTMLInputElement).files?.[0];
  if (!file) return;

  if (file.size > 5 * 1024 * 1024) {
    toast.error("Banner must be less than 5MB");
    return;
  }

  if (preview.value) URL.revokeObjectURL(preview.value);
  const localUrl = URL.createObjectURL(file);
  preview.value = localUrl;

  toast.promise(uploadBranding({ type: "banner", file }), {
    loading: "Uploading store banner...",
    success: "Banner updated successfully!",
    error: "Failed to upload banner. Please try again.",
  });
};

onUnmounted(() => {
  if (preview.value) URL.revokeObjectURL(preview.value);
});

const displayImage = computed(() => preview.value || props.currentBanner);
</script>
