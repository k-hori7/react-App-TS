import GetCategories from "@/app/_components/GetCategories";
import Title from "@/app/_components/Title";
import Link from "next/link";
export default function Home() {
  const title: string = "カテゴリー 一覧";
  return (
    <>
      <div className="flex justify-between">
        <Title title={title} />
        <Link
          href="/admin/categories/new"
          className="bg-blue-500 text-white font-bold rounded py-1 px-4 my-4 mx-3 hover:bg-blue-600"
        >
          新規作成
        </Link>
      </div>
      <GetCategories />
    </>
  );
}
