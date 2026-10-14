import type { ProductVariant } from "@/domains/products/types/inventory.types";
import type { VariantSelection } from "@/domains/storefront/types/variant-selection.types";
import { computed, ref, toValue, type ComputedRef, type MaybeRef } from "vue";

export function useVariantSelection(
  variants: ComputedRef<ProductVariant[]>,
  basePrice: ComputedRef<number>,
): VariantSelection {
  const selectedColor = ref<string | undefined>();
  const selectedSize = ref<string | undefined>();

  const hasVariants = computed(() => toValue(variants).length > 0);

  const selectedVariant = computed(() => {
    return toValue(variants).find(
      (v) => v.color === selectedColor.value && v.size === selectedSize.value,
    );
  });

  const displayPrice = computed(() =>
    selectedVariant.value ? selectedVariant.value.price : toValue(basePrice),
  );

  const maxStock = computed(() =>
    selectedVariant.value
      ? selectedVariant.value?.stock - selectedVariant.value?.reserved
      : Math.max(...toValue(variants).map((v) => v.stock - v.reserved), 0),
  );

  function setSelectedColor(color: string | undefined) {
    selectedColor.value = color;
  }

  function setSelectedSize(size: string | undefined) {
    selectedSize.value = size;
  }

  return {
    selectedColor,
    selectedSize,
    selectedVariant,
    displayPrice,
    maxStock,
    hasVariants,
    setSelectedColor,
    setSelectedSize,
  };
}
