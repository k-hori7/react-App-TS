import { useState, useEffect } from "react";

export function usePosts() {
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // APIでpostsを取得する処理をuseEffectで実行します。
  useEffect(() => {
    const fetcher = async () => {
      setError(null);
      setIsLoading(true);
      try {
        const res = await fetch(
          "https://1hmfpsvto6.execute-api.ap-northeast-1.amazonaws.com/dev/posts"
        );
        const data = await res.json();
        setPosts(data.posts);
      } catch (err) {
        console.error("postsを取得できません。:", err);
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetcher();
  }, []);

  return { posts, isLoading, error };
}
