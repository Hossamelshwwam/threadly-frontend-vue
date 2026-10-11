<template>
  <span @click="open = true" class="contents">
    <slot />
  </span>

  <Dialog @update:open="handleOpenChange" :open="open">
    <DialogContent class="sm:max-w-100 p-0 overflow-hidden font-sans gap-0">
      <div
        class="h-0.5 w-full shrink-0"
        :style="{
          background: `linear-gradient(to right, transparent, ${cfg.accentLine}, transparent)`,
        }"
      ></div>

      <div class="px-6 pt-6 pb-6 space-y-5">
        <DialogHeader class="p-0 space-y-0">
          <div class="flex flex-col items-center gap-3 text-center">
            <div
              :class="
                cn(
                  'w-12 h-12 rounded-xl border flex items-center justify-center',
                  cfg.iconBg,
                )
              "
            >
              <VariantIcon :variant="variant" :class="cfg.iconColor" />
            </div>

            <DialogTitle :class="cn('text-lg font-bold', cfg.titleColor)">
              {{ title }}
            </DialogTitle>

            <DialogDescription
              class="text-sm text-zinc-500 font-normal leading-relaxed max-w-75 mx-auto"
            >
              {{ description }}
            </DialogDescription>
          </div>
        </DialogHeader>

        <div
          :class="
            cn('flex items-start gap-3 p-3.5 rounded-lg border', cfg.checkboxBg)
          "
          v-if="requireCheckbox"
        >
          <input
            type="checkbox"
            id="confirm-check"
            v-model="checked"
            class="mt-0.5 h-4 w-4 rounded border-zinc-300 accent-amber-500 cursor-pointer"
          />
          <label
            for="confirm-check"
            class="text-sm text-zinc-500 leading-relaxed cursor-pointer select-none"
          >
            {{ checkboxLabel }}
          </label>
        </div>

        <DialogFooter class="p-0 flex gap-3 sm:gap-3">
          <CustomButton
            variant="outline"
            theme="neutral"
            size="lg"
            class="flex-1"
            @click="handleCancel"
            :disabled="isLoading"
          >
            {{ cancelText }}
          </CustomButton>

          <CustomButton
            variant="solid"
            :theme="cfg.confirmTheme"
            size="lg"
            class="flex-1"
            @click="handleConfirm"
            :disabled="isConfirmDisabled"
            :loading="isLoading"
          >
            {{ isLoading ? loadingText : confirmText }}
          </CustomButton>
        </DialogFooter>
      </div>
    </DialogContent>
  </Dialog>
</template>

<script setup lang="ts">
import { computed, ref, watch } from "vue";
import type { ConfirmationDialogProps } from "./type";
import { VARIANTS } from "./lib/varients";
import { cn } from "@/lib/utils";
import VariantIcon from "./VariantIcon.vue";
import Dialog from "../ui/dialog/Dialog.vue";
import DialogContent from "../ui/dialog/DialogContent.vue";
import DialogHeader from "../ui/dialog/DialogHeader.vue";
import DialogTitle from "../ui/dialog/DialogTitle.vue";
import DialogDescription from "../ui/dialog/DialogDescription.vue";
import CustomButton from "../custom-button/CustomButton.vue";
import DialogFooter from "../ui/dialog/DialogFooter.vue";

const props = withDefaults(defineProps<ConfirmationDialogProps>(), {
  variant: "default",
  title: "Confirm Action",
  description: "Are you sure you want to proceed?",
  confirmText: "Confirm",
  cancelText: "Cancel",
  isLoading: false,
  loadingText: "Processing...",
  requireCheckbox: false,
  checkboxLabel: "I understand the consequences",
  autoClose: true,
});

const open = ref(false);
const checked = ref(false);

const cfg = computed(() => VARIANTS[props.variant]);
const isConfirmDisabled = computed(
  () => props.isLoading || (props.requireCheckbox && !checked.value),
);

const handleConfirm = () => {
  if (props.requireCheckbox && !checked.value) return;
  props.onConfirm();
  if (props.autoClose) {
    open.value = false;
    checked.value = false;
  }
};

const handleOpenChange = (value: boolean) => {
  if (value) {
    open.value = true;
    return;
  }

  if (open.value) {
    handleCancel();
  }
};
const handleCancel = () => {
  props.onCancel?.();
  open.value = false;
  checked.value = false;
};
</script>

<style scoped></style>
