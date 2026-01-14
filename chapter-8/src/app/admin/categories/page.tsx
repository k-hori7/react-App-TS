import FormArticle from "@/app/_components/UpdateArticle";

export default function Home() {
  const title: string = "カテゴリー 一覧";
  return (
    <>
      <FormArticle title={title} />
    </>
  );
}
