"use client";
import Link from "next/link";
import { DataPost } from "../_types/typePost";

export default function PostCard({ post }: DataPost) {
  return (
    <Link href={`/posts/${post.id}`} className="block ">
      <article className="border border-gray-300 mb-8 p-4">
        <div className="flex justify-between">
          <div className="text-gray-500 text-sm">
            {new Date(post.createdAt).toLocaleDateString("ja-JP")}
          </div>
          <div className="flex">
            {post.postCategories.map((postCategory) => (
              <div
                key={postCategory.category.id}
                className="border border-blue-600 text-blue-600 rounded px-2 py-0.5 text-sm mr-2"
              >
                {postCategory.category.name}
              </div>
            ))}
          </div>
        </div>

        <p className="text-2xl mt-2 mb-4">APIで取得した{post.title}</p>

        <div
          className="text-gray-700"
          style={{
            display: "-webkit-box",
            WebkitBoxOrient: "vertical",
            WebkitLineClamp: 2,
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
      </article>
    </Link>
  );
}
