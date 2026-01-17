import Link from "next/link";
import GetArticles from "./_components/GetArticles";
import Title from "@/app/_components/Title";

export default function Home() {
  const title = "記事一覧";
  return (
    <>
      <div className="flex justify-between">
        <Title title={title} />
        <Link
          href="/admin/posts/new"
          className="bg-blue-500 text-white font-bold rounded py-1 px-4 my-4 mx-3 hover:bg-blue-600"
        >
          新規作成
        </Link>
      </div>
      <GetArticles />
    </>
  );
}
