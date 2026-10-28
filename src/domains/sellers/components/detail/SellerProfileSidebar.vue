<template>
  <div class="flex flex-col gap-4 font-sans">
    <!-- Visual Identity Card -->
    <div
      class="bg-white border border-zinc-200 rounded-lg overflow-hidden flex flex-col"
    >
      <!-- Banner Frame -->
      <div class="h-24 bg-zinc-100 relative shrink-0">
        <img
          v-if="seller.banner"
          :src="seller.banner"
          alt="Store Banner"
          class="object-cover h-full w-full"
        />
        <div
          v-else
          class="w-full h-full bg-linear-to-r from-zinc-200 to-zinc-100"
        />

        <!-- Logo Frame Placement Overlap -->
        <div
          class="absolute -bottom-6 left-6 w-14 h-14 rounded-lg bg-white border border-zinc-200 flex items-center justify-center p-0.5 overflow-hidden shadow-sm"
        >
          <div
            class="relative w-full h-full rounded bg-amber-50 flex items-center justify-center overflow-hidden"
          >
            <img
              v-if="seller.logo"
              :src="seller.logo"
              alt="Store Logo"
              class="object-cover h-full w-full"
            />
            <Store v-else :size="20" class="text-amber-500 text-xl" />
          </div>
        </div>
      </div>

      <!-- Info Metrics Fields Container -->
      <div class="px-6 pt-9 pb-6 space-y-4">
        <div>
          <h2 class="text-lg font-bold text-zinc-900">
            {{ seller.storeName }}
          </h2>
          <p class="text-xs text-zinc-400 font-mono mt-0.5">
            @{{ seller.storeSlug }}
          </p>
        </div>

        <p
          v-if="seller.description"
          class="text-sm font-normal text-zinc-500 leading-relaxed bg-zinc-50 rounded-md p-3"
        >
          {{ seller.description }}
        </p>

        <div class="border-t border-zinc-100 pt-3">
          <div
            class="flex items-center justify-between py-2.5 border-b border-zinc-50 last:border-0"
          >
            <span
              class="text-xs font-semibold text-zinc-400 uppercase tracking-wider"
            >
              Owner Name
            </span>
            <span class="text-sm font-medium text-zinc-700">
              {{ seller.userId?.name ?? "—" }}
            </span>
          </div>

          <div
            class="flex items-center justify-between py-2.5 border-b border-zinc-50 last:border-0"
          >
            <span
              class="text-xs font-semibold text-zinc-400 uppercase tracking-wider"
            >
              Owner Email
            </span>
            <span class="text-sm font-medium text-zinc-700">
              {{ seller.userId?.email ?? "—" }}
            </span>
          </div>

          <div
            class="flex items-center justify-between py-2.5 border-b border-zinc-50 last:border-0"
          >
            <span
              class="text-xs font-semibold text-zinc-400 uppercase tracking-wider"
            >
              Status
            </span>
            <span class="text-sm font-medium text-zinc-700">
              <SellerStatusBadge :status="seller.status" />
            </span>
          </div>

          <div
            class="flex items-center justify-between py-2.5 border-b border-zinc-50 last:border-0"
          >
            <span
              class="text-xs font-semibold text-zinc-400 uppercase tracking-wider"
            >
              Rating
            </span>
            <span class="text-sm font-medium text-zinc-700">
              {{ seller.rating ? `★ ${seller.rating}` : "No reviews" }}
            </span>
          </div>

          <div
            class="flex items-center justify-between py-2.5 border-b border-zinc-50 last:border-0"
          >
            <span
              class="text-xs font-semibold text-zinc-400 uppercase tracking-wider"
            >
              Total Orders
            </span>
            <span class="text-sm font-medium text-zinc-700">
              {{ seller.totalSales ? `★ ${seller.totalSales}` : "No Orders Yet" }}
            </span>
          </div>

          <div
            class="flex items-center justify-between py-2.5 border-b border-zinc-50 last:border-0"
          >
            <span
              class="text-xs font-semibold text-zinc-400 uppercase tracking-wider"
            >
              Registered
            </span>
            <span class="text-sm font-medium text-zinc-700">
              {{ registeredAt }}
            </span>
          </div>
        </div>
      </div>
    </div>

    <!-- Dynamic Structural Lifecycle Management Console Actions Card -->
    <div class="bg-white border border-zinc-200 rounded-lg p-5 space-y-4">
      <p class="text-sm font-bold text-zinc-700">Store Lifecycle Controls</p>

      <CustomInput
        v-model="note"
        name="adminNote"
        type="text"
        placeholder="Append decision feedback statement note..."
      />

      <div class="flex flex-col gap-2">
        <ConfirmationDialog
          v-if="seller.status !== 'approved'"
          variant="success"
          title="Approve Seller Profile"
          description="This will allow the merchant to activate store configurations and publish inventory data streams."
          confirm-text="Approve Store"
          :is-loading="isUpdating"
          :on-confirm="
            () => emit('update-status', { status: 'approved', adminNote: note || undefined })
          "
        >
          <CustomButton
            variant="solid"
            theme="success"
            size="md"
            full-width
            :left-icon="ApproveIcon"
          >
            Approve Store
          </CustomButton>
        </ConfirmationDialog>

        <ConfirmationDialog
          v-if="seller.status !== 'suspended'"
          variant="danger"
          title="Suspend Seller Profile"
          description="This will restrict the merchant from managing orders or listings. All listed items will immediately be made private."
          confirm-text="Suspend Store"
          require-checkbox
          checkbox-label="I authorize freezing operations for this store profile"
          :is-loading="isUpdating"
          :on-confirm="
            () => emit('update-status', { status: 'suspended', adminNote: note || undefined })
          "
        >
          <CustomButton
            variant="soft"
            theme="danger"
            size="md"
            full-width
            :left-icon="SuspendIcon"
          >
            Suspend Store
          </CustomButton>
        </ConfirmationDialog>
      </div>

      <div
        v-if="seller.adminNote"
        class="text-xs font-medium text-zinc-500 border-t border-zinc-100 pt-3"
      >
        <span
          class="font-semibold block text-zinc-400 uppercase tracking-wider mb-1"
        >
          Active Admin Note:
        </span>
        <p
          class="font-mono bg-zinc-50 border border-zinc-100 rounded-md p-2 italic"
        >
          &quot;{{ seller.adminNote }}&quot;
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, h, ref } from "vue";
import { Ban, CircleCheck, Store } from "lucide-vue-next";

import type { SellerProfile } from "../../types/seller.types";
import CustomButton from "@/shared/components/custom-button/CustomButton.vue";
import CustomInput from "@/shared/components/custom-input/CustomInput.vue";
import ConfirmationDialog from "@/shared/components/confirmation-dialog/ConfirmationDialog.vue";
import SellerStatusBadge from "../SellerStatusBadge.vue";

const props = defineProps<{
  seller: SellerProfile;
  isUpdating: boolean;
}>();

const emit = defineEmits<{
  "update-status": [variables: {
    status: "approved" | "suspended";
    adminNote?: string;
  }];
}>();

const note = ref("");

const ApproveIcon = () => h(CircleCheck, { size: 14 });
const SuspendIcon = () => h(Ban, { size: 14 });

const registeredAt = computed(() =>
  new Date(props.seller.createdAt).toLocaleDateString("en-EG", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }),
);
</script>
