import { CategoriesIndexResponse } from "../api/admin/categories/route";
import { useSupabaseSession } from "./useSupabaseSession";
import useSWR from "swr";

const fetcher = async ([url, token]: [string, string]) => {
  const res: Response = await fetch(url, {
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
  });
  if (!res.ok) {
    throw new Error("Nwtwork Error");
  }
  const data: CategoriesIndexResponse = await res.json();
  return data;
};

export function useCategories() {
  const { token } = useSupabaseSession();
  const { data, error, isLoading } = useSWR<CategoriesIndexResponse>(
    token ? [`/api/admin/categories`, token] : null,
    fetcher
  );
  return { categories: data?.categories, isLoading, error };
}
