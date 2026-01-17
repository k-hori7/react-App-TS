"use client";
import Title from "@/app/_components/Title";
import { useCategories } from "@/app/_hooks/useCategories";
import { useParams } from "next/navigation";
import CategoryForm from "@/app/_components/CategoryForm";
import { useRouter } from "next/navigation";
export default function Home() {
  const title = "カテゴリー編集";
  const Params = useParams();
  const router = useRouter();
  const categoryId = Number(Params.id);
  const { categories } = useCategories();
  const category = categories.find((category) => category.id === categoryId);
  const handleSubmit = async (categoryName: string) => {
    const res = await fetch(`/api/admin/categories/${categoryId}`, {
      method: "PUT",
      body: JSON.stringify({ name: categoryName }),
    });
    if (res.ok) {
      router.push("/admin/categories");
      router.refresh();
    }
  };
  const handleDelete = async () => {
    if (!confirm("削除しますか？")) return;
    await fetch(`/api/admin/categories/${categoryId}`, {
      method: "DELETE",
    });
    router.push("/admin/categories");
    router.refresh();
  };
  if (!categories) return <p>Loading...</p>;
  return (
    <>
      <Title title={title} />
      <CategoryForm
        initialData={category?.name}
        onDelete={handleDelete}
        onSubmit={handleSubmit}
        submitButtonText="更新"
      />
    </>
  );
}
