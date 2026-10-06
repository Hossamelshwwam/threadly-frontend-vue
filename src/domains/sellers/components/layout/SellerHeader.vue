<template>
  <header
    class="h-16 bg-white border-b border-zinc-200 flex items-center justify-between px-4 sm:px-6 sticky top-0 z-30 font-sans"
  >
    <div class="flex items-center gap-3 sm:gap-4">
      <Sheet v-model:open="isMobileMenuOpen">
        <SheetTrigger asChild>
          <button
            class="lg:hidden p-2 -ml-2 text-zinc-600 hover:bg-zinc-100 rounded-lg transition-colors"
          >
            <Menu :size="24" />
          </button>
        </SheetTrigger>
        <SheetContent
          side="left"
          class="w-[280px] p-0 flex flex-col font-sans z-[100]"
        >
          <SheetHeader
            class="h-16 px-6 border-b border-zinc-200 flex flex-row items-center justify-start m-0 space-y-0"
          >
            <SheetTitle class="flex items-center gap-2 m-0 mt-0">
              <div
                class="w-8 h-8 rounded bg-main flex items-center justify-center shadow-sm"
              >
                <span class="text-white font-black text-lg leading-none">
                  T
                </span>
              </div>
              <span class="text-lg font-bold text-zinc-900 tracking-tight">
                Vendor Hub
              </span>
            </SheetTitle>
          </SheetHeader>

          <nav class="flex-1 overflow-y-auto p-4 space-y-1">
            <div
              class="text-[11px] font-bold text-zinc-400 uppercase tracking-wider mb-4 px-2 mt-2"
            >
              Store Management
            </div>

            <RouterLink
              v-for="item in sellerNavItems"
              :key="item.href"
              :to="item.href"
              @click="isMobileMenuOpen = false"
              :class="[
                'flex items-center gap-3 px-3 py-3 rounded-lg text-sm font-medium transition-colors outline-none',
                isActive(item.href)
                  ? 'bg-amber-50 text-main font-bold'
                  : 'text-zinc-500 hover:bg-zinc-50 hover:text-zinc-900',
              ]"
            >
              <component
                :is="item.icon"
                :class="[
                  'text-[18px]',
                  isActive(item.href) ? 'text-main' : 'text-zinc-400',
                ]"
              />
              {{ item.label }}
            </RouterLink>
          </nav>
        </SheetContent>
      </Sheet>

      <div>
        <h1 class="text-base sm:text-lg font-bold text-zinc-900 leading-none">
          {{ pageTitle }}
        </h1>
        <p class="hidden sm:block text-xs font-normal text-zinc-400 mt-1">
          Manage your store & inventory
        </p>
      </div>
    </div>

    <div class="flex items-center gap-2 sm:gap-3">
      <button
        class="relative w-8 h-8 sm:w-9 sm:h-9 rounded-md bg-zinc-50 border border-zinc-200 flex items-center justify-center text-zinc-500 hover:border-zinc-300 hover:text-zinc-700 transition-colors cursor-pointer"
      >
        <Bell class="text-sm sm:text-base" />
        <span
          class="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-amber-400"
        ></span>
      </button>

      <AccountMenu />
    </div>
  </header>
</template>

<script setup lang="ts">
import { sellerNavItems } from "@/shared/lib/seller-nav-config.ts";
import { computed, ref } from "vue";
import { useRoute } from "vue-router";
import { Bell, Menu } from "lucide-vue-next";
import Sheet from "@/shared/components/ui/sheet/Sheet.vue";
import SheetTrigger from "@/shared/components/ui/sheet/SheetTrigger.vue";
import SheetContent from "@/shared/components/ui/sheet/SheetContent.vue";
import SheetHeader from "@/shared/components/ui/sheet/SheetHeader.vue";
import SheetTitle from "@/shared/components/ui/sheet/SheetTitle.vue";
import AccountMenu from "@/shared/components/buyer/AccountMenu.vue";

const route = useRoute();
const isMobileMenuOpen = ref(false);

const handleCloseMenuMobile = () => {
  isMobileMenuOpen.value = false;
};

const currentPage = computed(() =>
  sellerNavItems.find((item) => {
    if (item.href === "/seller") return route.path === "/seller";
    return route.path.startsWith(item.href);
  }),
);

const pageTitle = computed(
  () => currentPage.value?.label ?? "Seller Dashboard",
);

const isActive = (href: string) =>
  href === "/seller" ? route.path === "/seller" : route.path.startsWith(href);
</script>

<style scoped></style>
