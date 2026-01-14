import Link from "next/link";
import GetArticles from "@/app/_components/GetArticles";

export default function Home() {
  const title = "記事一覧";
  return (
    <>
      <div className="flex justify-between py-5 px-7">
        <p className="font-bold text-lg ">{title}</p>
        <Link
          href="/admin/posts/new"
          className="bg-blue-500 text-white font-bold rounded py-2 px-4"
        >
          新規作成
        </Link>
      </div>
      <GetArticles />
    </>
  );
}
