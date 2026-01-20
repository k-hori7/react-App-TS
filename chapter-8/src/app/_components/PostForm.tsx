"use client";
import { useEffect, useState } from "react";
import { useCategories } from "../_hooks/useCategories";
import CategoryBadge from "./CategoryBadge";
import { v4 as uuidv4 } from "uuid";
import { supabase } from "../_libs/supabase";
import Image from "next/image";
import { ChangeEvent } from "react";
type PostData = {
  title: string;
  content: string;
  thumbnailImageKey: string;
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
      thumbnailImageKey: "",
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
  //DB保存用
  const [thumbnailImageKey, setThumbnailImageKey] = useState(
    initialData?.thumbnailImageKey || ""
  );
  const handleImageChange = async (
    event: ChangeEvent<HTMLInputElement>
  ): Promise<void> => {
    //ファイルがない時はreturn ファイル選択後キャンセルとかで中身がない時(null)など
    if (!event.target.files || event.target.files.length == 0) {
      return;
    }
    const file = event.target.files[0];
    //uuidv4(): 重複しない「一意のID（例: 550e8400-e29b...）」を生成する関数
    const filepath = `private/${uuidv4()}`;

    //supabaseにアップロード
    const { data, error } = await supabase.storage
      .from("post_thumbnail")
      .upload(filepath, file, {
        //(保存先のパス、ファイル本体、オプション)
        cacheControl: "3600", //ブラウザに3600秒キャッシュ
        upsert: false, //名前が重複したら上書きするか
      });
    if (error) {
      alert(error.message);
      return;
    }

    setThumbnailImageKey(data.path);
    setFormData((prev) => ({ ...prev, thumbnailImageKey: data.path }));
  };
  //表示用
  const [thumbnailImageUrl, setThumbnailImageUrl] = useState<null | string>(
    null
  );
  useEffect(() => {
    if (!thumbnailImageKey) return;

    const fetcher = async () => {
      const {
        data: { publicUrl },
      } = await supabase.storage
        .from("post_thumbnail")
        .getPublicUrl(thumbnailImageKey);
      setThumbnailImageUrl(publicUrl);
    };
    fetcher();
  }, [thumbnailImageKey]);
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
      await onSubmit(formData);
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
            <label
              htmlFor="thumbnailImageKey"
              className="block font-medium mb-2"
            >
              サムネイルURL
            </label>
            <input
              type="file"
              id="thumbnailImageKey"
              disabled={isPending}
              onChange={handleImageChange}
              className="w-full border rounded px-3 py-2 mb-4"
            />
            {thumbnailImageUrl && (
              /* eslint-disable-next-line @next/next/no-img-element */
              <Image
                src={thumbnailImageUrl}
                alt="Peview"
                width={400}
                height={400}
                className="w-40 h-24 object-cover rounded mb-2"
              />
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
                type="button"
                disabled={isPending}
                onClick={onDelete}
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
