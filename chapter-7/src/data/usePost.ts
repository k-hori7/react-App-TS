import { useState, useEffect } from "react";

export function usePost(id) {
  const [post, setPost] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // APIでpostsを取得する処理をuseEffectで実行します。
  useEffect(() => {
    const fetcher = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const res = await fetch(
          `https://1hmfpsvto6.execute-api.ap-northeast-1.amazonaws.com/dev/posts/${id}`
        );
        const data = await res.json();
        setPost(data.post);
      } catch (err) {
        console.error("postを取得できません。:", err);
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetcher();
    console.log(post, isLoading, error);
  }, [id]);

  return { post, isLoading, error };
}
