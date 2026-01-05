import { useState, useEffect } from "react";
import type { DataPost, PostInfo } from "../type";

export function usePost(id: string | undefined) {
  const [post, setPost] = useState<PostInfo | null>(null);
  const [error, setError] = useState<unknown>(null);
  const [isLoading, setIsLoading] = useState<boolean | null>(true);

  // APIでpostsを取得する処理をuseEffectで実行します。
  useEffect(() => {
    const fetcher = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const res: Response = await fetch(
          `https://1hmfpsvto6.execute-api.ap-northeast-1.amazonaws.com/dev/posts/${id}`
        );
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
  console.log(post, isLoading, error);
  return { post, isLoading, error };
}
