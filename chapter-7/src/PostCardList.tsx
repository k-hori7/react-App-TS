import PostCard from "./PostCard";
import { usePosts } from "./data/usePosts";

export default function PostCardList() {
  const { posts, isLoading } = usePosts();

  if (isLoading) {
    return <p>読み込み中....</p>;
  }

  return (
    <>
      {posts.map((post) => (
        <PostCard post={post} key={post.id} />
      ))}
    </>
  );
}
