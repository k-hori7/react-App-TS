import { useState, useEffect } from "react";
import { DataPosts } from "../_types/typePost";
import { NextApiPost } from "../_types/typePost";

export function usePosts() {
  const [posts, setPosts] = useState<NextApiPost[]>([]);
  const [error, setError] = useState<unknown | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // APIでpostsを取得する処理をuseEffectで実行します。
  useEffect(() => {
    const fetcher = async () => {
      setError(null);
      setIsLoading(true);
      try {
        const res: Response = await fetch(`/api/posts`);
        const data: DataPosts = await res.json();
        setPosts(data.posts);
      } catch (err: unknown) {
        if (err instanceof Error) {
          console.error("postsを取得できません。:", err);
          setError(err.message);
        } else {
          setError("予期せぬエラーを取得しました。");
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetcher();
  }, []);
  return { posts, isLoading, error };
}
