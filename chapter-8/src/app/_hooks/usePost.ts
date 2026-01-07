import { useState, useEffect } from "react";
import { MicroCmsPost } from "../_types/MicroCmsPost";

export function usePost(id: string | undefined) {
  const [post, setPost] = useState<MicroCmsPost | null>(null);
  const [error, setError] = useState<unknown>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // APIでpostsを取得する処理をuseEffectで実行します。
  useEffect(() => {
    const fetcher = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const res: Response = await fetch(
          `https://ctbujttv1g.microcms.io/api/v1/posts/${id}`,
          {
            headers: {
              "X-MICROCMS-API-KEY": process.env
                .NEXT_PUBLIC_MICROCMS_API_KEY as string,
            },
          }
        );
        const data: MicroCmsPost = await res.json();
        setPost(data);
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
