import { DataPosts } from "../_types/typePost";
import { useFetch } from "./useFetch";

export function usePosts() {
  const { data, error, isLoading } = useFetch<DataPosts>(`/api/posts`);
  return { posts: data?.posts, error, isLoading };
}
