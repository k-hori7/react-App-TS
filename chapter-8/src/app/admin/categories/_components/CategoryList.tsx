"use client";
import CategoryItem from "./CategoryItem";
import { useCategories } from "../../../_hooks/useCategories";

export default function CategoryList() {
  const { categories, isLoading } = useCategories();
  if (isLoading) {
    return <p>読み込み中....</p>;
  }
  return (
    <>
      <div className="py-4 px-6">
        {categories.map((category) => (
          <CategoryItem category={category} key={category.id} />
        ))}
      </div>
    </>
  );
}
