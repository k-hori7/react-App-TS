import Title from "@/app/_components/Title";
import UpdateArticle from "@/app/_components/UpdateArticle";

export default function Home() {
  const title = "記事編集";
  return (
    <>
      <Title title={title} />
      <UpdateArticle />
    </>
  );
}
