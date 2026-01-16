"use client";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { usePost } from "../_hooks/usePost";
import { useEffect } from "react";
import { useCategories } from "../_hooks/useCategories";

export default function UpdateArticle() {
  const router = useRouter();
  const params = useParams<{ id: string }>();
  const id = Number(params.id);
  //取得用post
  const { post: fetchedPost, isLoading } = usePost(id);
  const { categories: allCategories, isLoading: isCatLoading } =
    useCategories();
  //編集用post
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    thumbnailUrl: "",
    categories: [] as { id: number; name: string }[],
  });
  //GETした後に反映するために必要
  useEffect(() => {
    if (fetchedPost) {
      setFormData({
        title: fetchedPost.title,
        content: fetchedPost.content,
        thumbnailUrl: fetchedPost.thumbnailUrl,
        categories: fetchedPost.postCategories.map((pc) => ({
          id: pc.category.id,
          name: pc.category.name,
        })),
      });
    }
  }, [fetchedPost]);
  //クリックした彼ゴリーがすでに選ばれているかどうかで追加か削除かを自動で切り替える
  const handleCheck = (catId: number, catName: string) => {
    setFormData((prev) => {
      //someは配列の中に条件に合うものが一つでもあればtrue = 一つでも一致するIDのカテゴリーが元々クリックされていればtrue
      const isAlreadySelected = prev.categories.some((c) => c.id === catId);
      const newCategories = isAlreadySelected
        ? prev.categories.filter((c) => c.id !== catId) // 削除
        : [...prev.categories, { id: catId, name: catName }]; // 追加（名前も入れる）
      return { ...prev, categories: newCategories };
    });
  };
  //現在の入力値を保持
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  //PUT
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch(`/api/admin/posts/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        alert("更新に成功しました");
        setFormData({
          title: "",
          content: "",
          thumbnailUrl: "",
          categories: [],
        });
        router.push("/admin/posts");
        router.refresh();
      } else {
        alert("更新失敗");
      }
    } catch (error) {
      console.log("通信エラー", error);
    }
  };
  //DELETE
  const handleDelete = async () => {
    if (!confirm("本当に削除しますか？")) return;
    try {
      const response = await fetch(`/api/admin/posts/${id}`, {
        method: "DELETE",
      });
      if (response.ok) {
        alert("削除に成功しました");
        router.push("/admin/posts");
        router.refresh();
      } else {
        alert("削除に失敗しました");
      }
    } catch (error) {
      console.error("通信エラー：", error);
    }
  };

  if (isLoading || isCatLoading) return <p>読み込み中....</p>;
  if (!fetchedPost) return <p>記事が見つかりませんでした</p>;

  return (
    <div className="p-6">
      <div>
        <form onSubmit={handleSubmit}>
          <p className="text-left font-medium mb-1">タイトル</p>
          <input
            className="w-full border rounded px-3 py-2 mb-4"
            type="text"
            value={formData.title}
            onChange={handleChange}
            name="title"
          />

          <p className="text-left font-medium mb-1">内容</p>
          <textarea
            className="w-full border rounded px-3 py-2 mb-4"
            value={formData.content}
            onChange={handleChange}
            name="content"
          />

          <p className="text-left font-medium mb-1">サムネイルURL</p>
          <input
            className="py-2"
            type="text"
            value={formData.thumbnailUrl}
            onChange={handleChange}
            name="thumbnailUrl"
          />
          {/* Javascriptの論理積 &&の左がtrueの時右表示 */}
          {formData.thumbnailUrl !== "" && (
            /* eslint-disable-next-line @next/next/no-img-element */
            <img
              src={formData.thumbnailUrl}
              alt="Preview"
              className="w-40 h-24 object-cover rounded mb-2"
            />
          )}

          <p className="text-left font-medium mb-1">カテゴリー</p>
          <div className="flex flex-wrap gap-2 mb-6">
            {/*  allCategories(全選択肢)を回す */}
            {allCategories?.map((category) => {
              const isSelected = formData.categories.some(
                (c) => c.id === category.id
              );
              return (
                <label
                  key={category.id}
                  className={`border px-4 py-2 rounded-full cursor-pointer transition-colors ${
                    isSelected
                      ? "bg-blue-600 text-white border-blue-600"
                      : "bg-white text-black"
                  }`}
                >
                  <input
                    type="checkbox"
                    className="hidden"
                    checked={isSelected}
                    onChange={() => handleCheck(category.id, category.name)}
                  />
                  {category.name}
                </label>
              );
            })}
          </div>

          <button className="bg-blue-600 text-white font-bold rounded py-1 px-5 hover:bg-blue-700 transition-colors">
            更新
          </button>
          <button
            className="bg-red-600 text-white font-bold rounded py-1 px-5 hover:bg-red-700 transition-colors"
            onClick={handleDelete}
            type="button"
          >
            削除
          </button>
        </form>
      </div>
    </div>
  );
}
