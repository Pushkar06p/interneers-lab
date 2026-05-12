export interface ProductFilterState {
  name: string;
  brand: string;
  minQuantity?: number;
  maxQuantity?: number;
  minPrice?: number;
  maxPrice?: number;
  category: string[];
  sort_by: string;
}
