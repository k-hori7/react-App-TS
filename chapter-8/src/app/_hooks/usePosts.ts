import { useState, useEffect } from "react";
import type { DataPosts } from "../_types/type";
import { MicroCmsPost } from "../_types/MicroCmsPost";

export function usePosts() {
  const [posts, setPosts] = useState<MicroCmsPost[]>([]);
  const [error, setError] = useState<unknown | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // APIでpostsを取得する処理をuseEffectで実行します。
  useEffect(() => {
    const fetcher = async () => {
      setError(null);
      setIsLoading(true);
      try {
        const res: Response = await fetch(
          "https://ctbujttv1g.microcms.io/api/v1/posts",
          {
            headers: {
              "X-MICROCMS-API-KEY": "S3CD8fSuRw9tUvpRBAc6W0L7mJtlezuaQpDj",
            },
          }
        );
        const data: DataPosts = await res.json();
        setPosts(data.contents);
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
  console.log(posts);
  return { posts, isLoading, error };
}
