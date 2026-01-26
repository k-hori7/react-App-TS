"use client";
import { useEffect, useState } from "react";
import { useCategories } from "../_hooks/useCategories";
import CategoryBadge from "./CategoryBadge";
import { v4 as uuidv4 } from "uuid";
import { supabase } from "../_libs/supabase";
import Image from "next/image";
import { ChangeEvent } from "react";
import { useForm } from "react-hook-form";
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
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { isSubmitting },
  } = useForm({
    defaultValues: initialData || {
      title: "",
      content: "",
      thumbnailImageKey: "",
      categories: [],
    },
  });
  const { categories: allCategories, isLoading } = useCategories(); //カテゴリー全種

  const thumbnailImageKey = watch("thumbnailImageKey"); //リアルタイム監視
  const selectedCategories = watch("categories");

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

    setValue("thumbnailImageKey", data.path);
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
    const isSelected = selectedCategories.some((c) => c.id === catId);
    const newCategories = isSelected
      ? selectedCategories.filter((c) => c.id !== catId) //clickしたID以外のものだけ残す
      : [...selectedCategories, { id: catId, name: catName }];
    setValue("categories", newCategories);
  };
  if (isLoading) return <p>読み込み中</p>;

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="px-7">
          <div>
            <label className="block font-medium mb-2">タイトル</label>
            <input
              type="text"
              className="w-full border rounded px-3 py-2 mb-4"
              disabled={isSubmitting}
              {...register("title")}
            />
          </div>
          <div>
            <label className="block font-medium mb-2">内容</label>
            <textarea
              disabled={isSubmitting}
              className="w-full border rounded px-3 py-2 mb-4"
              {...register("content")}
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
              disabled={isSubmitting}
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
                  isSelected={selectedCategories.some(
                    (c) => c.id === category.id
                  )}
                  onToggle={() => handleCheck(category.id, category.name)}
                  disabled={isSubmitting}
                />
              ))}
            </div>
          </div>
          <div className="pt-4">
            <button
              disabled={isSubmitting}
              className=" text-white font-bold py-2 px-6 rounded bg-blue-500 hover:bg-blue-600 "
            >
              {submitButtonText}
            </button>
            {onDelete && (
              <button
                type="button"
                disabled={isSubmitting}
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
