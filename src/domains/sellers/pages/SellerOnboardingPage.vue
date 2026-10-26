<template>
  <div class="max-w-3xl mx-auto w-full pt-8 pb-16">
    <!-- Welcome Header -->
    <div class="text-center mb-10 space-y-4">
      <div
        class="w-16 h-16 bg-amber-50 border border-amber-100 rounded-2xl flex items-center justify-center mx-auto shadow-sm"
      >
        <Store :size="30" class="text-amber-500" />
      </div>
      <div>
        <h1 class="text-3xl font-black text-zinc-900 tracking-tight">
          Open Your Threadly Store
        </h1>
        <p class="text-sm text-zinc-500 mt-2 max-w-lg mx-auto">
          Join thousands of vendors selling their products. Set up your store
          name and link your bank account to start receiving payouts.
        </p>
      </div>
    </div>

    <RouterLink
      to="/account"
      class="inline-flex items-center gap-1.5 text-sm text-zinc-500 hover:text-zinc-800 transition-colors w-fit mb-5"
    >
      <ChevronLeft :size="18" /> Back to Account
    </RouterLink>
    <div class="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
      <!-- Left Column: The Form -->
      <div
        class="md:col-span-8 bg-white p-6 sm:p-8 rounded-2xl border border-zinc-200 shadow-sm"
      >
        <StoreRegistrationForm />
      </div>

      <!-- Right Column: Value Props / Info -->
      <div class="md:col-span-4 space-y-4">
        <div class="bg-zinc-50 rounded-xl p-5 border border-zinc-200">
          <Landmark :size="20" class="text-zinc-700 mb-3" />
          <h4 class="text-sm font-bold text-zinc-900 mb-1">Secure Payouts</h4>
          <p class="text-xs text-zinc-500 leading-relaxed">
            Your bank details are encrypted and securely stored. We use these
            strictly to wire your earnings directly to your account.
          </p>
        </div>

        <div class="bg-amber-50 rounded-xl p-5 border border-amber-100">
          <ShieldCheck :size="20" class="text-amber-600 mb-3" />
          <h4 class="text-sm font-bold text-amber-900 mb-1">
            Seller Protection
          </h4>
          <p class="text-xs text-amber-700/80 leading-relaxed">
            Threadly handles the payment processing, fraud detection, and
            customer support infrastructure so you can focus on selling.
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ChevronLeft, Landmark, ShieldCheck, Store } from "lucide-vue-next";
import StoreRegistrationForm from "../components/register/StoreRegistrationForm.vue";
</script>
