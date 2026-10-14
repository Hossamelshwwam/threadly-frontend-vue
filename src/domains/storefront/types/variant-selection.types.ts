import type { ProductVariant } from "@/domains/products/types/inventory.types";
import type { ComputedRef, Ref } from "vue";

export interface VariantSelection {
  selectedColor: Ref<string | undefined>;
  selectedSize: Ref<string | undefined>;
  selectedVariant: ComputedRef<ProductVariant | undefined>;
  displayPrice: ComputedRef<number>;
  maxStock: ComputedRef<number>;
  hasVariants: ComputedRef<boolean>;
  setSelectedColor: (color: string | undefined) => void;
  setSelectedSize: (size: string | undefined) => void;
}
