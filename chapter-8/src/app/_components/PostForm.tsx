"use client";
import { useState } from "react";
import { useCategories } from "../_hooks/useCategories";
import CategoryBadge from "./CategoryBadge";
type PostData = {
  title: string;
  content: string;
  thumbnailUrl: string;
  categories: {
    id: number;
    name: string;
  }[];
};

type Props = {
  initialData?: PostData;
  onSubmit: (data: PostData) => Promise<void>;
  onDelete?: () => Promise<void>;
  submitButtonText: string;
};

export default function PostForm({
  initialData,
  onSubmit,
  onDelete,
  submitButtonText,
}: Props) {
  const [formData, setFormData] = useState<PostData>(
    initialData || {
      title: "",
      content: "",
      thumbnailUrl: "",
      categories: [],
    }
  );
  const [isPending, setIsPending] = useState<boolean>(false); //送信中かどうか
  const { categories: allCategories, isLoading } = useCategories(); //カテゴリー全種
  //汎用的に使える入力値とデータを同一にする関数
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  //カテゴリークリック時にデータと一致させるためのトグル
  const handleCheck = (catId: number, catName: string) => {
    setFormData((prev) => {
      const isSelected = prev.categories.some((c) => c.id === catId);
      const newCategories = isSelected
        ? prev.categories.filter((c) => c.id !== catId)
        : [...prev.categories, { id: catId, name: catName }];
      return { ...prev, categories: newCategories };
    });
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsPending(true);
    try {
      await onSubmit(formData); //エラー処理は？？
    } finally {
      setIsPending(false);
    }
  };
  if (isLoading) return <p>読み込み中</p>;

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="px-7">
          <div>
            <label className="block font-medium mb-2">タイトル</label>
            <input
              type="text"
              name="title"
              className="w-full border rounded px-3 py-2 mb-4"
              value={formData.title}
              onChange={handleChange}
              disabled={isPending}
            />
          </div>
          <div>
            <label className="block font-medium mb-2">内容</label>
            <textarea
              name="content"
              value={formData.content}
              disabled={isPending}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2 mb-4"
            ></textarea>
          </div>

          <div>
            <label className="block font-medium mb-2">サムネイルURL</label>
            <input
              name="thumbnailUrl"
              value={formData.thumbnailUrl}
              disabled={isPending}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2 mb-4"
            />
            {formData.thumbnailUrl && (
              /* eslint-disable-next-line @next/next/no-img-element */
              <img
                src={formData.thumbnailUrl}
                alt="Peview"
                className="w-40 h-24 object-cover rounded mb-2"
              ></img>
            )}
          </div>
          <div>
            <label className="block font-medium mb-2">カテゴリー</label>
            <div className="flex flex-wrap gap-2">
              {allCategories?.map((category) => (
                <CategoryBadge
                  key={category.id}
                  name={category.name}
                  isSelected={formData.categories.some(
                    (c) => c.id === category.id
                  )}
                  onToggle={() => handleCheck(category.id, category.name)}
                  disabled={isPending}
                />
              ))}
            </div>
          </div>
          <div className="pt-4">
            <button
              disabled={isPending}
              className=" text-white font-bold py-2 px-6 rounded bg-blue-500 hover:bg-blue-600 "
            >
              {submitButtonText}
            </button>
            {onDelete && (
              <button
                disabled={isPending}
                className="bg-red-600 text-white font-bold py-2 px-6 rounded hover:bg-red-700 "
              >
                削除
              </button>
            )}
          </div>
        </div>
      </form>
    </>
  );
}
