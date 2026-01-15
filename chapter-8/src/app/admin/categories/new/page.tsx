import PostCategory from "@/app/_components/PostCategory";
import Title from "@/app/_components/Title";
export default function Home() {
  const title = "カテゴリー作成";

  return (
    <>
      <Title title={title} />
      <PostCategory />
    </>
  );
}
