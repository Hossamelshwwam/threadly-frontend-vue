<template>
  <div>
    <header class="fixed top-0 left-0 right-0 z-50 bg-main w-screen shadow-sm">
      <div
        class="container mx-auto px-4 sm:px-8 h-20 flex items-center justify-between relative"
      >
        <!-- LEFT: Menu Slider -->
        <div class="flex items-center gap-2 sm:gap-4">
          <Sheet v-model:open="isOpen">
            <SheetTrigger asChild>
              <button
                aria-label="Open menu"
                class="p-2 sm:p-3 rounded-xl hover:bg-white/10 text-white/90 hover:text-white transition-all cursor-pointer"
              >
                <Menu :size="24" />
              </button>
            </SheetTrigger>

            <SheetContent
              side="left"
              class="w-full sm:w-[400px] p-0 z-[100] border-r border-zinc-200 bg-white flex flex-col font-sans overflow-hidden shadow-2xl"
            >
              <!-- Clean, Light Header -->
              <SheetHeader
                class="px-8 py-6 border-b border-zinc-100 text-left shrink-0 bg-white"
              >
                <SheetTitle
                  class="text-xl font-black tracking-tight text-zinc-900 flex items-center gap-3"
                >
                  <span
                    class="w-8 h-8 rounded-lg bg-amber-50 border border-amber-100 flex items-center justify-center text-amber-600 shadow-sm"
                  >
                    T
                  </span>
                  THREADLY
                </SheetTitle>
              </SheetHeader>

              <!-- Primary Navigation Links -->
              <div class="flex-1 overflow-y-auto px-8 py-8 bg-white">
                <div class="flex flex-col">
                  <RouterLink
                    v-for="(link, index) in NAV_LINKS"
                    :key="link.label"
                    :to="link.href"
                    class="group flex flex-col outline-none py-5 border-b border-zinc-100/60 last:border-0"
                    @click="isOpen = false"
                  >
                    <span
                      class="text-[10px] font-bold text-zinc-300 uppercase tracking-widest mb-1.5 font-mono"
                    >
                      0{{ index + 1 }}
                    </span>
                    <div
                      class="flex items-center justify-between text-zinc-800 group-hover:text-amber-600 transition-colors duration-300"
                    >
                      <!-- Font significantly reduced to text-xl / text-2xl -->
                      <span
                        class="text-xl sm:text-2xl font-extrabold uppercase tracking-tight group-hover:translate-x-1.5 transition-transform duration-300"
                      >
                        {{ link.label }}
                      </span>
                      <ArrowUpRight
                        class="opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 text-amber-500"
                        :size="24"
                      />
                    </div>
                    <!-- Descriptions are now always softly visible, turning slightly darker on hover -->
                    <span
                      class="text-xs font-medium text-zinc-400 mt-1 group-hover:text-zinc-500 transition-colors duration-300"
                    >
                      {{ link.desc }}
                    </span>
                  </RouterLink>
                </div>

                <!-- Mobile Profile Navigation Safeguard -->
                <RouterLink
                  to="/account"
                  class="group flex items-center gap-3 text-sm font-bold text-zinc-600 hover:text-amber-600 transition-colors sm:hidden pt-8 mt-4 border-t border-zinc-100"
                  @click="isOpen = false"
                >
                  <div
                    class="w-10 h-10 rounded-full bg-zinc-50 border border-zinc-200 flex items-center justify-center group-hover:bg-amber-50 group-hover:border-amber-200 group-hover:text-amber-600 transition-colors"
                  >
                    <User :size="18" />
                  </div>
                  Account Settings
                </RouterLink>
              </div>

              <!-- Soft Grey Footer -->
              <div class="p-8 border-t border-zinc-100 bg-zinc-50/80 shrink-0">
                <p
                  class="text-[10px] font-semibold text-zinc-400 mt-6 uppercase tracking-widest"
                >
                  © 2026 Threadly Global
                </p>
              </div>
            </SheetContent>
          </Sheet>
        </div>

        <!-- CENTER: Logo -->
        <div
          class="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
        >
          <RouterLink
            to="/"
            class="text-2xl sm:text-3xl font-black tracking-tight text-white hover:opacity-80 transition-opacity"
          >
            THREADLY
          </RouterLink>
        </div>

        <!-- RIGHT: Account Dropdown & Cart -->
        <div class="flex items-center gap-2 sm:gap-4">
          <AccountMenu />

          <RouterLink
            to="/cart"
            aria-label="Shopping cart"
            class="p-2 sm:p-3 rounded-xl hover:bg-white/10 text-white/90 hover:text-white transition-all cursor-pointer relative"
          >
            <ShoppingBag :size="24" />
            <span
              v-if="itemCount > 0"
              class="absolute top-1.5 right-1.5 w-4.5 h-4.5 flex items-center justify-center bg-white text-main text-[9px] font-black rounded-full shadow-md animate-in zoom-in"
            >
              {{ itemCount > 9 ? "9+" : itemCount }}
            </span>
          </RouterLink>
        </div>
      </div>
    </header>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { ArrowUpRight, Menu, ShoppingBag, User } from "lucide-vue-next";
import AccountMenu from "./AccountMenu.vue";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";
import useCart from "@/domains/cart/hooks/useCart.ts";

const NAV_LINKS = [
  { label: "Home", href: "/", desc: "Return to the storefront" },
  {
    label: "Collections",
    href: "/products",
    desc: "Explore our latest arrivals",
  },
  { label: "Account", href: "/account", desc: "Manage your profile & orders" },
  { label: "Cart", href: "/cart", desc: "View your shopping bag" },
];

const isOpen = ref(false);

const { itemCount } = useCart();
</script>

<style scoped></style>
