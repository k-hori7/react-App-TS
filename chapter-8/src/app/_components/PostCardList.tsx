"use client";
import PostCard from "./PostCard";
import { usePosts } from "../_hooks/usePosts";
import { MicroCmsPost } from "../_types/MicroCmsPost";

export default function PostCardList() {
  const { posts, isLoading } = usePosts();

  if (isLoading) {
    return <p>読み込み中....</p>;
  }
  console.log(posts);
  return (
    <>
      {posts.map((post: MicroCmsPost) => (
        <PostCard post={post} key={post.id} />
      ))}
    </>
  );
}
