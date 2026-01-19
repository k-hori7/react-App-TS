"use client";
import Title from "@/app/_components/Title";
import PostForm from "@/app/_components/PostForm";
import { usePost } from "@/app/_hooks/usePost";
import { useParams, useRouter } from "next/navigation";
import { NextApiPost } from "@/app/_types/typePost";
import { useSupabaseSession } from "@/app/_hooks/useSupabaseSession";
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
  const title = "記事編集";
  const params = useParams<{ id: string }>();
  const id = Number(params.id);
  const { post } = usePost(id);
  const router = useRouter();
  const { token } = useSupabaseSession();
  const handleSubmit = async (data: PostData) => {
    if (!token) return;
    await fetch(`/api/admin/posts/${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
      headers: {
        Authorization: token,
      },
    });
    router.push("/admin/posts");
    router.refresh();
  };
  const handleDelete = async () => {
    if (!token) return;
    if (!confirm("削除しますか？")) return;
    await fetch(`/api/admin/posts/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: token,
      },
    });
    router.push("/admin/posts");
    router.refresh();
  };
  const formatToPostData = (post: NextApiPost): PostData => {
    return {
      title: post.title,
      content: post.content,
      thumbnailUrl: post.thumbnailUrl,
      // postCategories(入れ子) を categories(フラットな配列) に変換
      categories: post.postCategories.map((pc) => ({
        id: pc.category.id,
        name: pc.category.name,
      })),
    };
  };
  if (!post) return <p>Loading...</p>;

  return (
    <>
      <Title title={title} />
      <PostForm
        initialData={formatToPostData(post)}
        onSubmit={handleSubmit}
        onDelete={handleDelete}
        submitButtonText="更新"
      />
    </>
  );
}
