import { useState, useEffect } from "react";
import { NextApiPost } from "../_types/typePost";
import { DataPost } from "../_types/typePost";

export function usePost(id: number | undefined) {
  const [post, setPost] = useState<NextApiPost | null>(null);
  const [error, setError] = useState<unknown>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // APIでpostsを取得する処理をuseEffectで実行します。
  useEffect(() => {
    const fetcher = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const res: Response = await fetch(`/api/posts/${id}`);
        const data: DataPost = await res.json();
        setPost(data.post);
      } catch (err: unknown) {
        if (err instanceof Error) {
          console.error("postを取得できません。:", err);
          setError(err.message);
        } else {
          setError("予期せぬエラーが発生しました");
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetcher();
  }, [id]);
  return { post, isLoading, error };
}
