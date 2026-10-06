<template>
  <aside
    class="hidden lg:flex w-64 bg-white border-r border-zinc-200 flex-col font-sans h-screen sticky top-0 shrink-0"
  >
    <div class="h-16 flex items-center px-6 border-b border-zinc-200">
      <RouterLink to="/seller" class="flex items-center gap-2 outline-none">
        <div
          class="w-8 h-8 rounded bg-main flex items-center justify-center shadow-sm"
        >
          <span class="text-white font-black text-lg leading-none">T</span>
        </div>
        <span class="text-lg font-bold text-zinc-900 tracking-tight">
          Vendor Hub
        </span>
      </RouterLink>
    </div>

    <nav class="flex-1 overflow-y-auto p-4 space-y-1 scrollbar-hide">
      <div
        class="text-[11px] font-bold text-zinc-400 uppercase tracking-wider mb-4 px-2 mt-4"
      >
        Store Management
      </div>

      <RouterLink
        v-for="item in sellerNavItems"
        :key="item.href"
        :to="item.href"
        :class="[
          'flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors outline-none group',
          isActive(item.href)
            ? 'bg-amber-50 text-main font-bold'
            : 'text-zinc-500 hover:bg-zinc-50 hover:text-zinc-900',
        ]"
      >
        <component
          :is="item.icon"
          :class="[
            'text-[18px]',
            isActive(item.href)
              ? 'text-main'
              : 'text-zinc-400 group-hover:text-zinc-500',
          ]"
        />
        {{ item.label }}
      </RouterLink>
    </nav>

    <div class="p-4 border-t border-zinc-200">
      <div class="bg-zinc-50 rounded-lg p-3 border border-zinc-200">
        <p class="text-xs font-bold text-zinc-900">Need Help?</p>
        <p class="text-[10px] text-zinc-500 mt-1 mb-2 leading-relaxed">
          Contact platform support for seller assistance.
        </p>
        <a
          href="mailto:support@threadly.com"
          class="text-xs text-main hover:text-main-warm hover:underline font-bold transition-colors"
        >
          Contact Support &rarr;
        </a>
      </div>
    </div>
  </aside>
</template>

<script setup lang="ts">
import { sellerNavItems } from "@/shared/lib/seller-nav-config";
import { RouterLink, useRoute } from "vue-router";
const route = useRoute();

const isActive = (href: string) =>
  href === "/seller" ? route.path === "/seller" : route.path.startsWith(href);
</script>

<style scoped></style>
