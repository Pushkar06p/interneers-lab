import { useMemo } from "react";
import { Product } from "types/product";
import { Category } from "types/category";
type ReportItem = {
  id: string | undefined;
  name: string;
  lte_thousand: number;
  lte_lakh: number;
  gt_lakh: number;
  gte_threshold: number;
  lt_threshold: number;
  count: number;
};
export const useReportCategories = (
  threshold: number,
  products: Product[],
  categories: Category[],
) => {
  return useMemo(() => {
    const gte_threshold: Record<string, number> = {};
    const lt_threshold: Record<string, number> = {};
    const lte_thousand: Record<string, number> = {};
    const lte_lakh: Record<string, number> = {};
    const gt_lakh: Record<string, number> = {};
    const count: Record<string, number> = {};

    products.forEach((product) => {
      // console.log(product.name, product.price, product.category);

      if (!product.category) return;
      const cat = product.category;

      count[cat] = (count[cat] || 0) + 1;

      if (product.quantity >= threshold) {
        gte_threshold[cat] = (gte_threshold[cat] || 0) + 1;
      } else {
        lt_threshold[cat] = (lt_threshold[cat] || 0) + 1;
      }

      if (product.price <= 1000) {
        lte_thousand[cat] = (lte_thousand[cat] || 0) + 1;
      } else if (product.price <= 10000) {
        lte_lakh[cat] = (lte_lakh[cat] || 0) + 1;
      } else {
        gt_lakh[cat] = (gt_lakh[cat] || 0) + 1;
      }
    });
    let selectedCategories: ReportItem[] = [],
      rejectedCategories: ReportItem[] = [];
    categories.forEach((cat) => {
      if (cat.id) {
        if (lt_threshold[cat.id] / count[cat.id] > 0.1) {
          rejectedCategories.push({
            id: cat.id,
            name: cat.name,
            lte_thousand: lte_thousand[cat.id] || 0,
            lte_lakh: lte_lakh[cat.id] || 0,
            gt_lakh: gt_lakh[cat.id] || 0,
            gte_threshold: gte_threshold[cat.id] || 0,
            lt_threshold: lt_threshold[cat.id] || 0,
            count: count[cat.id] || 0,
          });
        } else {
          selectedCategories.push({
            id: cat.id,
            name: cat.name,
            lte_thousand: lte_thousand[cat.id] || 0,
            lte_lakh: lte_lakh[cat.id] || 0,
            gt_lakh: gt_lakh[cat.id] || 0,
            gte_threshold: gte_threshold[cat.id] || 0,
            lt_threshold: lt_threshold[cat.id] || 0,
            count: count[cat.id] || 0,
          });
        }
      }
    });

    return { selectedCategories, rejectedCategories };
  }, [products, categories, threshold]);
};
