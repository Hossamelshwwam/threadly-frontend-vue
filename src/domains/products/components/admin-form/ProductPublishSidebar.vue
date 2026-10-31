<template>
  <div class="col-span-1 space-y-4 sticky top-22 font-sans">
    <div class="bg-white border border-zinc-200 rounded-lg p-5 space-y-4 shadow-xs">
      <h2
        class="text-sm font-bold text-zinc-800 border-b border-zinc-100 pb-2"
      >
        Ownership & Lifecycle
      </h2>

      <CustomSelect
        v-if="enableSellers"
        name="sellerId"
        label="Assigned Merchant Store"
        placeholder="Platform Direct (Threadly direct)"
        :options="sellerOptions"
        :error="sellerIdError"
        v-model="sellerId"
      />

      <div class="flex flex-col">
        <label
          class="block text-xs font-medium text-zinc-500 uppercase tracking-wider mb-1.5"
        >
          Initial Publish State
        </label>
        <div class="grid grid-cols-3 gap-2">
          <button
            v-for="s in statuses"
            :key="s"
            type="button"
            @click="setStatus(s)"
            :class="
              cn(
                'h-11 rounded font-semibold text-sm border capitalize transition-all cursor-pointer',
                'bg-zinc-50 border-zinc-200 text-zinc-400 hover:bg-zinc-100',
                status === s &&
                  s === 'active' &&
                  'bg-success-bg border-success text-success',
                status === s &&
                  s === 'draft' &&
                  'bg-warning-bg border-warning text-warning',
                status === s &&
                  s === 'archived' &&
                  'bg-error-bg border-error text-error',
              )
            "
          >
            {{ s }}
          </button>
        </div>
      </div>
    </div>

    <CustomButton
      type="submit"
      variant="solid"
      theme="primary"
      full-width
      class="h-12 text-base"
      :disabled="isPending"
      :left-icon="SaveIcon"
    >
      {{ isPending ? "Creating Listing..." : "Save & Proceed" }}
    </CustomButton>
  </div>
</template>

<script setup lang="ts">
import { computed, h } from "vue";
import { useField } from "vee-validate";
import { Save } from "lucide-vue-next";
import CustomSelect from "@/shared/components/custom-select/CustomSelect.vue";
import CustomButton from "@/shared/components/custom-button/CustomButton.vue";
import { cn } from "@/shared/lib/utils";
import type { SellerProfile } from "@/domains/sellers/types/seller.types";
import type { ProductStatus } from "../../types/product.types";

const props = withDefaults(
  defineProps<{
    sellers?: SellerProfile[];
    isPending: boolean;
    enableSellers?: boolean;
  }>(),
  {
    sellers: () => [],
    enableSellers: true,
  },
);

const statuses = ["active", "draft", "archived"] as const;

const { value: sellerId, errorMessage: sellerIdError } =
  useField<string | undefined>("sellerId");

const { value: status } = useField<ProductStatus | undefined>("status");

const setStatus = (value: ProductStatus) => {
  status.value = value;
};

const sellerOptions = computed(() =>
  props.sellers.map((seller) => ({
    label: seller.storeName,
    value: seller._id,
  })),
);

const SaveIcon = () => h(Save, { size: 16 });
</script>
