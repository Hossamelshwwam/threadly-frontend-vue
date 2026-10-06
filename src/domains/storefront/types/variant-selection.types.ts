import type { ProductVariant } from "@/domains/products/types/inventory.types";

export interface VariantSelection {
  selectedColor: string | undefined;
  selectedSize: string | undefined;
  selectedVariant: ProductVariant | undefined;
  displayPrice: number;
  maxStock: number;
  hasVariants: boolean;
}
