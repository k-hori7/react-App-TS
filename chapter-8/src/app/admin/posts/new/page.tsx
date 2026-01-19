"use client";
import PostForm from "@/app/_components/PostForm";
import Title from "@/app/_components/Title";
import { useSupabaseSession } from "@/app/_hooks/useSupabaseSession";
import { useRouter } from "next/navigation";

type PostData = {
  title: string;
  content: string;
  thumbnailUrl: string;
  categories: {
    id: number;
    name: string;
  }[];
};
export default function Home() {
  const title = "記事作成";
  const router = useRouter();
  const { token } = useSupabaseSession();
  const handleSubmit = async (data: PostData) => {
    if (!token) return;
    const res = await fetch("/api/admin/posts", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        Authorization: token,
      },
    });
    if (res.ok) {
      router.push("/admin/posts");
      router.refresh();
    }
  };
  return (
    <>
      <Title title={title} />
      <PostForm onSubmit={handleSubmit} submitButtonText="作成" />
    </>
  );
}
