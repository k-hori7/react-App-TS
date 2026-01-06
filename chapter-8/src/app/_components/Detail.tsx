"use client";
import { useParams } from "next/navigation";
import { usePost } from "../_hooks/usePost";
import Image from "next/image";

export default function Detail() {
  const { id } = useParams<{ id: string }>();

  const { post, isLoading, error } = usePost(id);

  if (isLoading) {
    return <p>読み込み中....</p>;
  }

  if (!post) {
    console.log(error);
    return <p>記事が見つかりませんでした</p>;
  }
  console.log(post.thumbnailUrl);
  return (
    <div className="mx-auto my-10 max-w-[800px] px-4">
      <div className="flex flex-col p-4">
        <div className="mb-4">
          <Image
            src={post.thumbnailUrl}
            alt=""
            width={157}
            height={116}
            className="w-full h-auto"
          />
        </div>

        <div className="flex flex-col p-4">
          <div className="flex justify-between">
            <div className="text-gray-500 text-sm">
              {new Date(post.createdAt).toLocaleDateString("ja-JP")}
            </div>
            <div className="flex">
              {post.categories.map((category, index) => (
                <div
                  key={index}
                  className="border border-blue-600 rounded text-blue-600 text-sm mr-2 px-2 py-0.5"
                >
                  {category}
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
