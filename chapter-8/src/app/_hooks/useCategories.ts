import { useState, useEffect } from "react";
import { CategoriesIndexResponse } from "../api/admin/categories/route";
export type categoriesType = {
  id: number;
  name: string;
  createdAt: Date;
  updatedAt: Date;
};

export function useCategories() {
  const [categories, setCategories] = useState<categoriesType[]>([]);
  const [error, setError] = useState<unknown | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // APIでcategoriesを取得する処理をuseEffectで実行します。
  useEffect(() => {
    const fetcher = async () => {
      setError(null);
      setIsLoading(true);
      try {
        const res: Response = await fetch(`/api/admin/categories`);
        const data: CategoriesIndexResponse = await res.json();
        setCategories(data.categories);
      } catch (err: unknown) {
        if (err instanceof Error) {
          console.error("categoriesを取得できません。:", err);
          setError(err.message);
        } else {
          setError("予期せぬエラーを取得しました。");
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetcher();
  }, []);
  return { categories, isLoading, error };
}
