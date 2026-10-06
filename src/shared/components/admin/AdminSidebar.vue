<template>
  <div>
    <aside
      class="hidden lg:flex fixed left-0 top-0 h-screen w-60 bg-white border-r border-zinc-200 flex-col z-40"
    >
      <div
        class="flex items-center gap-2.5 px-6 h-16 border-b border-zinc-200 shrink-0"
      >
        <div
          class="w-7 h-7 rounded-md bg-main flex items-center justify-center"
        >
          <AtSign class="text-white text-base" />
        </div>
        <div class="flex flex-col leading-none">
          <span class="text-sm font-black tracking-tight text-zinc-950">
            Threadly
          </span>
          <span
            class="text-[10px] font-medium text-zinc-400 uppercase tracking-widest"
          >
            Admin
          </span>
        </div>
      </div>

      <nav class="flex-1 overflow-y-auto px-3 py-4 space-y-0.5">
        <p
          class="text-[10px] font-semibold text-zinc-400 uppercase tracking-widest px-3 mb-2"
        >
          Management
        </p>

        <RouterLink
          v-for="item in adminNavItems"
          :to="item.href"
          :key="item.href"
          :class="[
            'flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-medium transition-all duration-150 group relative',
            isActive(item.href)
              ? 'bg-amber-50 text-amber-700'
              : 'text-zinc-600 hover:bg-zinc-50 hover:text-zinc-900',
          ]"
        >
          <span
            v-if="isActive(item.href)"
            class="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-5 bg-amber-400 rounded-r-full"
          />

          <component
            :is="item.icon"
            :class="[
              'text-base shrink-0 transition-colors',
              isActive(item.href)
                ? 'text-amber-500'
                : 'text-zinc-400 group-hover:text-zinc-600',
            ]"
          />

          <span class="flex-1">{{ item.label }}</span>

          <span
            v-if="getBadgeCount(item.badge) > 0"
            class="min-w-4.5 h-4.5 px-1 rounded-full bg-amber-400 text-white text-[10px] font-bold flex items-center justify-center"
          >
            {{
              getBadgeCount(item.badge) > 99 ? "99+" : getBadgeCount(item.badge)
            }}
          </span>
        </RouterLink>
        <RouterLink
          key="back to home"
          to="/"
          :class="[
            'flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-medium transition-all duration-150 group relative',

            'text-zinc-600 hover:bg-zinc-50 hover:text-zinc-900',
          ]"
        >
          <ArrowLeft
            class="text-zinc-400 group-hover:text-zinc-600 text-base shrink-0 transition-colors"
          />

          <span class="flex-1">Back To Home</span>
        </RouterLink>
      </nav>

      <div class="px-3 py-4 border-t border-zinc-100">
        <button
          @click="logout"
          class="flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-medium text-zinc-500 hover:bg-red-50 hover:text-red-600 transition-all duration-150 w-full group cursor-pointer"
        >
          <LogOut
            class="text-base text-zinc-400 group-hover:text-red-500 transition-colors"
          />
          Sign out
        </button>
      </div>
    </aside>
  </div>
</template>

<script setup lang="ts">
import { useRoute } from "vue-router";
import useLogout from "../hooks/useLogout";
import { adminNavItems } from "@/shared/lib/admin-nav-config";
import { ArrowLeft, AtSign, LogOut } from "lucide-vue-next";

interface AdminSidebarProps {
  pendingSellers?: number;
  pendingPayouts?: number;
}

const props = withDefaults(defineProps<AdminSidebarProps>(), {
  pendingPayouts: 0,
  pendingSellers: 0,
});

const route = useRoute();
const { logout } = useLogout();

const getBadgeCount = (badge?: string) => {
  if (badge === "pending_sellers") return props.pendingSellers;
  if (badge === "pending_payouts") return props.pendingPayouts;
  return 0;
};

const isActive = (href: string) => {
  if (href === "/admin") return route.path === "/admin";
  return route.path.startsWith(href);
};
</script>

<style scoped></style>
