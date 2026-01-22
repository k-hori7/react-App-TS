import { DataPost } from "../_types/typePost";
import useSWR from "swr";

const fetcher = async (url: string) => {
  const res: Response = await fetch(url);
  if (!res.ok) {
    throw new Error("Network error");
  }
  const data: DataPost = await res.json();
  return data;
};
export function usePost(id: number | undefined) {
  const { data, error, isLoading } = useSWR<DataPost>(
    id ? `/api/posts/${id}` : null,
    fetcher
  );
  return { post: data?.post, isLoading, error };
}
