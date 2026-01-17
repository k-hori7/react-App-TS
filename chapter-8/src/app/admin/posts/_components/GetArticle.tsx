import Link from "next/link";
import { DataPost } from "@/app/_types/typePost";

export default function GetArticle({ post }: DataPost) {
  const date = new Date(post.updatedAt);
  return (
    <>
      <div className="py-2 border-b border-gray-300">
        <Link href={`/admin/posts/${post.id}`}>
          <div className="font-bold">{post.title}</div>
          <div>{date.toLocaleDateString("ja-JP")}</div>
        </Link>
      </div>
    </>
  );
}
