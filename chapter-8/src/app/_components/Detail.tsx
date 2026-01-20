"use client";
import { useParams } from "next/navigation";
import { usePost } from "../_hooks/usePost";
import Image from "next/image";
import { supabase } from "../_libs/supabase";
export default function Detail() {
  const params = useParams<{ id: string }>();
  const id = Number(params.id);
  const { post, isLoading, error } = usePost(id);

  if (isLoading) {
    return <p>読み込み中....</p>;
  }
  if (!post) {
    console.log(error);
    return <p>記事が見つかりませんでした</p>;
  }
  const { data } = supabase.storage
    .from("post_thumbnail")
    .getPublicUrl(post.thumbnailImageKey || "");
  const thumbnailImageUrl = data?.publicUrl ?? "";
  return (
    <div className="mx-auto my-10 max-w-[800px] px-4">
      <div className="flex flex-col p-4">
        <div className="mb-4">
          <Image
            src={thumbnailImageUrl}
            alt="thumbnail"
            width={800}
            height={450}
            priority
            className="object-cover rounded-lg"
          />
        </div>

        <div className="flex flex-col p-4">
          <div className="flex justify-between">
            <div className="text-gray-500 text-sm">
              {new Date(post.createdAt).toLocaleDateString("ja-JP")}
            </div>
            <div className="flex">
              {post.postCategories.map((postCategory, id) => (
                <div
                  key={id}
                  className="border border-blue-600 rounded text-blue-600 text-sm mr-2 px-2 py-0.5"
                >
                  {postCategory.category.name}
                </div>
              ))}
            </div>
          </div>

          <div className="text-2xl mt-2 mb-4">APIで取得した{post.title}</div>

          <div
            className="text-gray-700"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
        </div>
      </div>
    </div>
  );
}
