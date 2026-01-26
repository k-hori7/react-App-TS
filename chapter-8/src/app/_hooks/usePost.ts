import { DataPost } from "../_types/typePost";
import { useFetch } from "./useFetch";

export function usePost(id: number | undefined) {
  const url = id ? `/api/posts/${id}` : null;

  const { data, error, isLoading } = useFetch<DataPost>(url);
  return { post: data?.post, isLoading, error };
}
