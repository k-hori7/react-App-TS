"use client";
import CategoryForm from "@/app/_components/CategoryForm";
import Title from "@/app/_components/Title";
import { useRouter } from "next/navigation";
export default function Home() {
  const title = "カテゴリー作成";
  const router = useRouter();
  const handleSubmit = async (categoryName: string) => {
    const res = await fetch("/api/admin/categories", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name: categoryName }),
    });
    if (res.ok) {
      router.push("/admin/categories");
      router.refresh();
    }
  };
  return (
    <>
      <Title title={title} />
      <CategoryForm onSubmit={handleSubmit} submitButtonText="作成" />
    </>
  );
}
