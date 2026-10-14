<template>
  <section
    v-if="subscribed"
    class="relative overflow-hidden bg-gradient-to-br from-zinc-950 via-zinc-900 to-amber-950/30 py-24"
  >
    <div
      class="absolute top-0 right-0 w-[500px] h-[500px] bg-amber-500/10 rounded-full blur-[80px]"
    />
    <div class="container mx-auto px-8">
      <div class="max-w-lg mx-auto text-center space-y-8">
        <div
          class="w-20 h-20 rounded-2xl bg-amber-500/20 flex items-center justify-center mx-auto rotate-12 hover:rotate-0 transition-transform duration-500"
        >
          <Check :size="36" class="text-amber-400" />
        </div>
        <div class="space-y-3">
          <h2
            class="text-4xl md:text-5xl font-black text-white tracking-tight text-balance"
          >
            You&apos;re in.
          </h2>
          <p class="text-zinc-400 text-lg leading-relaxed">
            Welcome to the inner circle. First access, exclusive drops, and
            member-only pricing — right to your inbox.
          </p>
        </div>
      </div>
    </div>
  </section>
  <section
    v-else
    class="relative overflow-hidden py-24 md:py-32"
    :style="{
      background:
        'linear-gradient(180deg, #0c0a09 0%, #1c1917 50%, #292524 100%)',
    }"
  >
    <div
      class="absolute inset-0 opacity-30"
      :style="{ background: newsletterPattern }"
    />
    <div class="relative container mx-auto px-8">
      <div class="max-w-3xl mx-auto text-center space-y-10">
        <div
          class="inline-flex items-center gap-3 px-5 py-2.5 rounded-full border border-amber-500/20"
          :style="{
            background:
              'linear-gradient(135deg, rgba(217,154,74,0.15), rgba(245,158,11,0.1))',
          }"
        >
          <span class="w-2 h-2 rounded-full bg-amber-400" />
          <span
            class="text-xs font-bold text-amber-300 tracking-widest uppercase"
            >Newsletter</span
          >
        </div>
        <div class="space-y-4">
          <h2
            class="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight leading-[1.05] bg-linear-to-br from-amber-400 via-[#d99a4a] to-amber-500 bg-clip-text text-transparent"
          >
            Never Miss a Drop
          </h2>
          <p class="text-zinc-400 text-lg leading-relaxed max-w-lg mx-auto">
            Be the first to know about new arrivals, limited editions, and
            members-only pricing.
          </p>
        </div>
        <form
          @submit.prevent="handleSubmit"
          class="flex flex-col sm:flex-row items-center gap-3 max-w-lg mx-auto"
        >
          <div class="flex-1 relative w-full">
            <Mail
              class="absolute left-4 top-1/2 -translate-y-1/2 text-amber-600/60 text-lg"
              :size="18"
            />
            <input
              type="email"
              v-model="email"
              placeholder="your@email.com"
              class="w-full rounded-xl pl-12 pr-4 py-4 text-sm transition-all"
              required
              :style="{
                background: 'rgba(255,255,255,0.06)',
                border: '1px solid rgba(217,154,74,0.2)',
                color: '#f5f5f4',
                backdropFilter: 'blur(12px)',
              }"
            />
          </div>
          <button
            type="submit"
            class="w-full sm:w-auto font-bold text-sm rounded-xl px-8 py-4 flex items-center gap-2 transition-all whitespace-nowrap justify-center shadow-lg text-white"
            :style="{
              background: 'linear-gradient(135deg, #d99a4a, #f59e0b)',
            }"
          >
            Subscribe <ArrowRight :size="16" />
          </button>
        </form>
        <div
          class="flex items-center justify-center gap-6 text-zinc-500 text-xs"
        >
          <span class="flex items-center gap-1.5"
            ><Check :size="12" class="text-emerald-400" /> No spam</span
          >
          <span class="flex items-center gap-1.5"
            ><Check :size="12" class="text-amber-400" /> Unsubscribe
            anytime</span
          >
          <span class="flex items-center gap-1.5"
            ><Check :size="12" class="text-amber-400" /> 10k+ subscribers</span
          >
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ArrowRight, Check, Mail } from "lucide-vue-next";
import { ref } from "vue";

const email = ref("");
const subscribed = ref(false);

const newsletterPattern =
  "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23d99a4a' fill-opacity='0.05'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")";

function handleSubmit() {
  if (!email.value) return;
  subscribed.value = true;
  email.value = "";
}
</script>

<style scoped></style>
