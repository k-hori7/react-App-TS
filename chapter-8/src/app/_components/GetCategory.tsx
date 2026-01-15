import Link from "next/link";
type Category = {
  id: number;
  name: string;
};
type Props = {
  category: Category;
};
export default function GetCategory({ category }: Props) {
  return (
    <>
      <div className="py-2 border-b border-gray-300">
        <Link href={`/admin/categories/${category.id}`}>
          {/* nameが空の時クリックできるように\u00A0を追加 */}
          <div className="font-bold">{category.name || "\u00A0"}</div>
        </Link>
      </div>
    </>
  );
}
