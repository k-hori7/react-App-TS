"use client";
import { useParams } from "next/navigation";
import { usePost } from "../_hooks/usePost";
import Image from "next/image";

export default function Detail() {
  const { id } = useParams<{ id: string }>();
  // console.log(id);
  const { post, isLoading, error } = usePost(id);
  console.log(post);
  if (isLoading) {
    return <p>読み込み中....</p>;
  }

  if (!post) {
    console.log(error);
    return <p>記事が見つかりませんでした</p>;
  }
  console.log(post.thumbnail.url);
  return (
    <div className="mx-auto my-10 max-w-[800px] px-4">
      <div className="flex flex-col p-4">
        <div className="mb-4">
          <Image
            src={post.thumbnail.url}
            alt=""
            width={post.thumbnail.width}
            height={post.thumbnail.height}
            className="w-full h-auto"
          />
        </div>

        <div className="flex flex-col p-4">
          <div className="flex justify-between">
            <div className="text-gray-500 text-sm">
              {new Date(post.createdAt).toLocaleDateString("ja-JP")}
            </div>
            <div className="flex">
              {post.categories.map((categories, id) => (
                <div
                  key={id}
                  className="border border-blue-600 rounded text-blue-600 text-sm mr-2 px-2 py-0.5"
                >
                  {categories.name}
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
