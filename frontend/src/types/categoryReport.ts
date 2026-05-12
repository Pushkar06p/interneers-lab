export interface CategoryReport {
  id: string | undefined;
  name: string;
  lte_thousand: number;
  lte_lakh: number;
  gt_lakh: number;
  gte_threshold: number;
  lt_threshold: number;
}
