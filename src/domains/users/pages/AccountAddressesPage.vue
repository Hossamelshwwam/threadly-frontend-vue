<template>
  <AddressesSkeleton v-if="isLoading" />

  <div v-else class="font-sans flex-1">
    <!-- Header -->
    <div
      class="bg-white border border-zinc-200 rounded-2xl p-6 shadow-sm mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
    >
      <div>
        <h1 class="text-xl font-bold text-zinc-900 tracking-tight">
          Shipping Addresses
        </h1>
        <p class="text-xs text-zinc-500 font-medium mt-0.5">
          Manage your saved addresses for faster checkout.
        </p>
      </div>
      <CustomButton
        v-if="!isFormOpen"
        variant="solid"
        theme="primary"
        :left-icon="Plus"
        class="rounded-xl shadow-md font-bold"
        @click="handleOpenAdd"
      >
        Add New Address
      </CustomButton>
    </div>

    <!-- Conditional Form Render -->
    <div v-if="isFormOpen" class="mb-6">
      <AccountAddressForm
        :key="editingAddress?._id ?? 'new'"
        :initial-data="editingAddress"
        @close="handleCloseForm"
      />
    </div>

    <!-- Address Grid -->
    <div
      v-if="!isFormOpen && addresses.length === 0"
      class="bg-white border border-zinc-200 rounded-2xl p-12 text-center flex flex-col items-center"
    >
      <div
        class="h-16 w-16 bg-zinc-50 rounded-full flex items-center justify-center mb-4"
      >
        <MapPin :size="30" class="text-3xl text-zinc-400" />
      </div>
      <h3 class="text-lg font-bold text-zinc-900">No saved addresses</h3>
      <p class="text-zinc-500 text-sm mt-1 mb-6 max-w-sm mx-auto">
        You haven't saved any shipping addresses yet. Add one now to save time
        during checkout.
      </p>
      <CustomButton
        variant="outline"
        theme="neutral"
        :left-icon="Plus"
        @click="handleOpenAdd"
      >
        Add Your First Address
      </CustomButton>
    </div>
    <div v-else class="grid grid-cols-1 md:grid-cols-2 gap-5">
      <!-- Ensure default address always appears first using sort -->
      <template v-if="!isFormOpen">
        <AddressCard
          v-for="address in addresses"
          :key="address._id"
          :address="address"
          @edit="handleOpenEdit"
        />
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import { MapPin, Plus } from "lucide-vue-next";

import { useMyAddresses } from "@/domains/users/hooks/useUser";
import type { Address } from "@/domains/users/types/user.types";

import CustomButton from "@/shared/components/custom-button/CustomButton.vue";
import AddressCard from "../components/account/AddressCard.vue";
import AccountAddressForm from "../components/account/AccountAddressForm.vue";
import AddressesSkeleton from "../components/AddressesSkeleton.vue";

const { data: addressResponse, isLoading } = useMyAddresses();
const addresses = computed(() => addressResponse.value?.data || []);

const isFormOpen = ref(false);
const editingAddress = ref<Address | null>(null);

const handleOpenAdd = () => {
  editingAddress.value = null;
  isFormOpen.value = true;
};

const handleOpenEdit = (address: Address) => {
  editingAddress.value = address;
  isFormOpen.value = true;
};

const handleCloseForm = () => {
  isFormOpen.value = false;
  editingAddress.value = null;
};
</script>

<style scoped></style>
