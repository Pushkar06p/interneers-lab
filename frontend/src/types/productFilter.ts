export interface ProductFilterState {
  name: string;
  brand: string;
  minPrice?: number;
  maxPrice?: number;
  category: string[];
  sort_by: "-updated_at";
}
