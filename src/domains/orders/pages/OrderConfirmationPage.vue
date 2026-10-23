<template>
  <div
    class="max-w-2xl mx-auto px-4 py-20 font-sans text-center min-h-screen flex items-center justify-center"
  >
    <AuthGuard>
      <div
        class="bg-white border border-zinc-100 rounded-3xl shadow-sm p-10 md:p-14 flex flex-col items-center"
      >
        <div
          class="h-24 w-24 bg-emerald-50 rounded-full flex items-center justify-center mb-6"
        >
          <CircleCheck :size="60" class="text-6xl text-emerald-500" />
        </div>

        <h1
          class="text-3xl font-extrabold text-zinc-900 tracking-tight mb-2"
        >
          Order Successfully Placed!
        </h1>
        <p class="text-zinc-500 mb-8 max-w-md mx-auto leading-relaxed">
          Thank you for shopping with Threadly. We've received your order and
          the sellers are preparing your items for shipment.
        </p>

        <div
          class="bg-zinc-50 border border-zinc-200 rounded-xl p-4 w-full max-w-sm mb-8"
        >
          <p
            class="text-xs font-bold text-zinc-400 uppercase tracking-widest mb-1"
          >
            Order Reference
          </p>
          <p class="text-lg font-mono font-black text-zinc-800">
            #{{ orderReference }}
          </p>
        </div>

        <div class="flex flex-col sm:flex-row gap-4 w-full justify-center">
          <RouterLink to="/products" class="w-full sm:w-auto">
            <CustomButton
              variant="outline"
              theme="neutral"
              size="md"
              full-width
              class="rounded-xl font-bold"
            >
              Continue Shopping
            </CustomButton>
          </RouterLink>
          <RouterLink :to="`/account/orders/${id}`" class="w-full sm:w-auto">
            <CustomButton
              variant="solid"
              theme="primary"
              size="md"
              full-width
              :left-icon="FileText"
              class="rounded-xl font-bold shadow-md"
            >
              View Order Details
            </CustomButton>
          </RouterLink>
        </div>
      </div>
    </AuthGuard>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useRoute } from "vue-router";
import { CircleCheck, FileText } from "lucide-vue-next";
import CustomButton from "@/shared/components/custom-button/CustomButton.vue";
import AuthGuard from "@/domains/auth/guard/AuthGuard.vue";

const route = useRoute();

const id = computed(() => String(route.params.id ?? ""));
const orderReference = computed(() => id.value.slice(-8).toUpperCase());
</script>

<style scoped></style>
