"use client";
import GetCategory from "./GetCategory";
import { useCategories } from "../_hooks/useCategories";

export default function GetCategories() {
  const { categories, isLoading } = useCategories();
  if (isLoading) {
    return <p>読み込み中....</p>;
  }
  return (
    <>
      <div className="py-4 px-6">
        {categories.map((category) => (
          <GetCategory category={category} key={category.id} />
        ))}
      </div>
    </>
  );
}
