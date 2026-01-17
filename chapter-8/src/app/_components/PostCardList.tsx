"use client";
import PostCard from "./PostCard";
import { usePosts } from "../_hooks/usePosts";
import { NextApiPost } from "../_types/typePost";

export default function PostCardList() {
  const { posts, isLoading } = usePosts();

  if (isLoading) {
    return <p>読み込み中....</p>;
  }
  // console.log(posts);
  return (
    <>
      {posts.map((post: NextApiPost) => (
        <PostCard post={post} key={post.id} />
      ))}
    </>
  );
}
