import { CategoriesIndexResponse } from "../api/admin/categories/route";
import { useFetch } from "./useFetch";

export function useCategories() {
  const { data, error, isLoading } = useFetch<CategoriesIndexResponse>(
    `/api/admin/categories`
  );
  return { categories: data?.categories, isLoading, error };
}
