import { DataPosts } from "../_types/typePost";
import useSWR from "swr";

const fetcher = async (url: string) => {
  const res: Response = await fetch(url);
  if (!res.ok) {
    throw new Error("Network error");
  }
  const data: DataPosts = await res.json();
  return data;
};

export function usePosts() {
  const { data, error, isLoading } = useSWR<DataPosts>(`/api/posts`, fetcher);
  return { posts: data?.posts, error, isLoading };
}
