import PostArticle from "@/app/_components/PostArticle";
import Title from "@/app/_components/Title";
export default function Home() {
  const title = "記事作成";
  return (
    <>
      <Title title={title} />
      <PostArticle />
    </>
  );
}
