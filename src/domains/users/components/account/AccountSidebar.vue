<template>
  <!-- Note: top-28 ensures it sticks just below your 80px fixed navbar -->
  <div
    class="bg-white border border-zinc-200 rounded-2xl p-4 shadow-sm lg:sticky lg:top-28"
  >
    <div class="mb-6 px-4 pt-2">
      <h2 class="text-xl font-black text-zinc-900 tracking-tight">
        My Account
      </h2>
      <p class="text-xs text-zinc-500 mt-1 font-medium">
        Manage your profile & orders
      </p>
    </div>

    <nav class="flex flex-col gap-1.5">
      <div>
        <RouterLink
          to="/"
          class="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all text-zinc-600 hover:bg-zinc-50 hover:text-zinc-900"
        >
          <ArrowLeft :size="18" class="text-zinc-400" />
          Back To Home
        </RouterLink>
        <RouterLink
          v-for="link in NAV_LINKS"
          :key="link.name"
          :to="link.href"
          :class="
            cn(
              'flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all',
              isActive(link.href)
                ? 'bg-amber-50'
                : 'text-zinc-600 hover:bg-zinc-50 hover:text-zinc-900',
            )
          "
        >
          <component
            :is="link.icon"
            :size="18"
            :class="isActive(link.href) ? 'text-amber-400' : 'text-zinc-400'"
          />
          {{ link.name }}
        </RouterLink>
        <RouterLink
          v-if="data?.data.role === 'buyer'"
          to="/seller"
          class="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all text-zinc-600 hover:bg-zinc-50 hover:text-zinc-900"
        >
          <Store :size="18" class="text-zinc-400" />
          Register As Seller
        </RouterLink>
      </div>

      <div class="my-2 border-t border-zinc-100"></div>

      <!-- Logout Button -->
      <button
        class="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold text-red-600 hover:bg-red-50 transition-all w-full text-left"
        @click="logout"
      >
        <LogOut :size="18" />
        Sign Out
      </button>
    </nav>
  </div>
</template>

<script setup lang="ts">
import { useRoute } from "vue-router";
import {
  ArrowLeft,
  FileText,
  LockKeyhole,
  LogOut,
  MapPin,
  MessageSquareText,
  Store,
  User,
} from "lucide-vue-next";
import { cn } from "@/shared/lib/utils";
import useLogout from "@/shared/hooks/useLogout";
import { useGetMe } from "../../hooks/useUser";

const NAV_LINKS = [
  {
    name: "Account Details",
    href: "/account",
    icon: User,
  },
  {
    name: "Change Password",
    href: "/account/security",
    icon: LockKeyhole,
  },
  {
    name: "Shipping Addresses",
    href: "/account/addresses",
    icon: MapPin,
  },
  {
    name: "Order History",
    href: "/account/orders",
    icon: FileText,
  },
  {
    name: "Pending Reviews",
    href: "/account/reviews/pending",
    icon: MessageSquareText,
  },
];

const route = useRoute();

const { logout } = useLogout();

const { data } = useGetMe();

// Exact match for /account, otherwise startsWith for sub-routes
function isActive(href: string) {
  return href === "/account"
    ? route.path === "/account"
    : route.path.startsWith(href);
}
</script>

<style scoped></style>
