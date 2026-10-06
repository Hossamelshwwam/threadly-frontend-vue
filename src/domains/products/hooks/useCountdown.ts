import { onMounted, onUnmounted, ref } from "vue";

export default function useCountdown(target: Date) {
  const calc = () => {
    const diff = Math.max(0, target.getTime() - Date.now());
    return {
      days: Math.floor(diff / (1000 * 60 * 60 * 24)),
      hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((diff / (1000 * 60)) % 60),
      seconds: Math.floor((diff / 1000) % 60),
    };
  };
  const time = ref(calc());

  let intervalId: ReturnType<typeof setInterval>;
  onMounted(() => {
    intervalId = setInterval(() => (time.value = calc()), 1000);
  });

  onUnmounted(() => {
    clearInterval(intervalId);
  });
  return time;
}
