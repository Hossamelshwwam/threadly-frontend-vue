<template>
  <div
    :class="
      cn(
        'p-4 sm:p-5 transition-colors',
        isEditing ? 'bg-amber-50/30' : 'hover:bg-zinc-50/30',
      )
    "
  >
    <div class="flex flex-col sm:flex-row gap-4 justify-between">
      <!-- Left Side: Product Image & Info ALWAYS side-by-side -->
      <div class="flex items-start gap-3 sm:gap-4 min-w-0 flex-1">
        <!-- Product Image -->
        <div
          class="w-16 h-16 sm:w-16 sm:h-16 rounded-lg bg-zinc-100 border border-zinc-200 flex items-center justify-center shrink-0 overflow-hidden relative shadow-sm"
        >
          <img
            v-if="item.productId.images?.[0]"
            :src="item.productId.images[0]"
            :alt="item.productName"
            class="object-cover h-full w-full"
          />
          <ImageIcon v-else class="text-zinc-400 text-xl" :size="20" />
        </div>

        <!-- Product Info & Variant Attributes -->
        <div class="flex-1 min-w-0 space-y-1.5">
          <div class="flex flex-wrap items-start justify-between gap-2">
            <p
              class="text-sm font-bold text-zinc-900 line-clamp-2 sm:line-clamp-1 pr-2"
            >
              {{ item.productName }}
            </p>
            <div v-if="!isEditing" class="shrink-0">
              <OrderItemStatusBadge :status="item.status" />
            </div>
          </div>

          <!-- Attributes Row: Size, Color, Slug -->
          <div class="flex flex-wrap items-center gap-1.5 sm:gap-2">
            <span
              class="text-[10px] font-bold bg-zinc-100 text-zinc-700 px-1.5 py-0.5 rounded border border-zinc-200"
            >
              Size: {{ item.size }}
            </span>
            <span
              class="text-[10px] font-bold bg-zinc-100 text-zinc-700 px-1.5 py-0.5 rounded border border-zinc-200 flex items-center gap-1"
            >
              Color:
              <span
                :style="{ backgroundColor: item.color }"
                class="w-2 h-2 rounded-full border border-black/10 inline-block"
              />
            </span>
            <span
              class="font-mono text-[10px] bg-zinc-50 border border-zinc-100 px-1.5 py-0.5 rounded text-zinc-400 truncate max-w-[100px] sm:max-w-none"
            >
              {{ item.productId.slug }}
            </span>
          </div>

          <!-- Tracking Number Display -->
          <div
            v-if="!isEditing && item.trackingNumber"
            class="items-center gap-1.5 text-[11px] sm:text-xs text-blue-600 font-mono mt-1 bg-blue-50/50 inline-flex px-2 py-0.5 rounded border border-blue-100 break-all sm:break-normal"
          >
            <Truck :size="12" class="shrink-0" />
            Tracking: {{ item.trackingNumber }}
          </div>

          <!-- Seller Reference -->
          <div
            v-if="!isEditing"
            class="text-[11px] sm:text-xs text-zinc-500 pt-0.5"
          >
            <span>
              Sold by:
              <strong class="text-zinc-800">
                {{ item.sellerId?.storeName || "Platform Direct" }}
              </strong>
            </span>
          </div>
        </div>
      </div>

      <!-- Right Side: Prices & Action Button -->
      <div
        class="flex flex-col items-center sm:items-end justify-between sm:justify-start border-t sm:border-t-0 border-zinc-100 pt-3 sm:pt-0 shrink-0 gap-3"
      >
        <div class="text-left sm:text-right">
          <p class="text-sm font-extrabold text-zinc-900">
            EGP
            {{
              item.total.toLocaleString(undefined, {
                minimumFractionDigits: 2,
              })
            }}
          </p>
          <p
            class="text-[11px] sm:text-xs font-medium text-zinc-400 mt-0.5"
          >
            {{ item.quantity }} x EGP {{ item.unitPrice.toLocaleString() }}
          </p>
        </div>

        <!-- Edit Button -->
        <button
          v-if="!isEditing"
          type="button"
          class="text-xs sm:text-[10px] font-bold text-amber-600 hover:text-amber-700 bg-amber-50 hover:bg-amber-100 border border-amber-200/50 px-3 py-1.5 sm:px-2 sm:py-1 rounded-md sm:rounded transition-colors flex items-center justify-center gap-1.5 sm:gap-1 cursor-pointer w-full sm:w-auto"
          @click="emit('editStart')"
        >
          <Pencil :size="14" class="sm:w-3 sm:h-3" />
          Manage Item
        </button>
      </div>
    </div>

    <!-- Render isolated Form Component cleanly -->
    <AdminOrderItemEditForm
      v-if="isEditing"
      :order-id="orderId"
      :item="item"
      @cancel="emit('editCancel')"
    />
  </div>
</template>

<script setup lang="ts">
import { Image as ImageIcon, Pencil, Truck } from "lucide-vue-next";

import { cn } from "@/shared/lib/utils";
import type { OrderItem } from "../../types/order.types";
import OrderItemStatusBadge from "../OrderItemStatusBadge.vue";
import AdminOrderItemEditForm from "./AdminOrderItemEditForm.vue";

defineProps<{
  item: OrderItem;
  orderId: string;
  isEditing: boolean;
}>();

const emit = defineEmits<{
  editStart: [];
  editCancel: [];
}>();
</script>
