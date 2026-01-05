"use client";
import { PostInfo } from "../type";
import PostCard from "./PostCard";
import { usePosts } from "../_data/usePosts";

export default function PostCardList() {
  const { posts, isLoading } = usePosts();

  if (isLoading) {
    return <p>読み込み中....</p>;
  }

  return (
    <>
      {posts.map((post: PostInfo) => (
        <PostCard post={post} key={post.id} />
      ))}
    </>
  );
}
