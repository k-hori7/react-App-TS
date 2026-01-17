"use client";
import { usePosts } from "@/app/_hooks/usePosts";
import { NextApiPost } from "@/app/_types/typePost";
import ArticleItem from "./ArticleItem";

export default function ArticleList() {
  const { posts, isLoading } = usePosts();
  if (isLoading) {
    return <p>読み込み中....</p>;
  }
  return (
    <>
      <div className="py-4 px-6">
        {posts.map((post: NextApiPost) => (
          <ArticleItem post={post} key={post.id} />
        ))}
      </div>
    </>
  );
}
