"use client";
import { usePosts } from "../_hooks/usePosts";
import { NextApiPost } from "../_types/typePost";
import GetArticle from "./GetArticle";

export default function GetArticles() {
  const { posts, isLoading } = usePosts();
  if (isLoading) {
    return <p>読み込み中....</p>;
  }
  return (
    <>
      <div className="py-4 px-6">
        {posts.map((post: NextApiPost) => (
          <GetArticle post={post} key={post.id} />
        ))}
      </div>
    </>
  );
}
