import type { ProductVariant } from "@/domains/products/types/inventory.types";
import type { VariantSelection } from "@/domains/storefront/types/variant-selection.types";
import { computed, ref } from "vue";

export function useVariantSelection(
  variants: ProductVariant[],
  basePrice: number,
): VariantSelection {
  const selectedColor = ref<string | undefined>();
  const selectedSize = ref<string | undefined>();

  const hasVariants = variants.length > 0;

  const selectedVariant = computed(() => {
    return variants.find(
      (v) => v.color === selectedColor.value && v.size === selectedSize.value,
    );
  });

  const displayPrice = computed(() =>
    selectedVariant.value ? selectedVariant.value.price : basePrice,
  );

  const maxStock = computed(() =>
    selectedVariant.value
      ? selectedVariant.value?.stock - selectedVariant.value?.reserved
      : Math.max(...variants.map((v) => v.stock - v.reserved), 0),
  );

  return {
    selectedColor: selectedColor.value,
    selectedSize: selectedSize.value,
    selectedVariant: selectedVariant.value,
    displayPrice: displayPrice.value,
    maxStock: maxStock.value,
    hasVariants,
  };
}
