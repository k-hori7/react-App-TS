import useSWR from "swr";
import { useSupabaseSession } from "@/app/_hooks/useSupabaseSession";

const fetcher = async ([url, token]: [string, string | undefined]) => {
  const headers: HeadersInit = {
    "Content-Type": "application/json",
  };

  if (token) {
    headers["Authorization"] = token;
  }

  const res = await fetch(url, { headers });

  if (!res.ok) {
    throw new Error("Network error");
  }
  return res.json();
};

export function useFetch<T>(url: string | null) {
  const { token } = useSupabaseSession();

  // URLがnull、またはトークンが必要なケースでトークンがない場合はSWRを動かさない
  const { data, error, isLoading } = useSWR<T>(
    url ? [url, token] : null,
    fetcher
  );

  return { data, error, isLoading };
}
