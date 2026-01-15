import Title from "@/app/_components/Title";
import UpdateCategory from "@/app/_components/UpdateCategory";
export default function Home() {
  const title = "カテゴリー編集";
  return (
    <>
      <Title title={title} />
      <UpdateCategory />
    </>
  );
}
