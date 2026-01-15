"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useCategories } from "../_hooks/useCategories";
export default function PostArticle() {
  const [post, setPost] = useState({
    title: "",
    content: "",
    categories: [],
    thumbnailUrl: "",
  });
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const requestBody = {
        ...post,
        categories: selectedIds.map((id) => ({ id })),
      };
      const response = await fetch("/api/admin/posts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });
      if (response.ok) {
        alert("作成に成功しました");
        setPost({
          title: "",
          content: "",
          categories: [],
          thumbnailUrl: "",
        });
        router.push("/admin/posts");
        router.refresh();
      } else {
        alert("作成失敗");
      }
    } catch (error) {
      console.log("通信エラー", error);
    }
  };
  const { categories, isLoading } = useCategories();
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const handleCheck = (id: number) => {
    //idでチェックされているか判別する
    setSelectedIds((prev: number[]) => {
      return prev.includes(id)
        ? prev.filter((prevID) => prevID !== id)
        : [...prev, id];
    });
  };
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setPost((prev) => ({ ...prev, [name]: value }));
  };

  if (isLoading) return <p>読み込み中</p>;
  return (
    <div className="p-6">
      <div>
        <form onSubmit={handleSubmit}>
          <p className="text-left font-medium mb-1">タイトル</p>
          <input
            className="w-full border rounded px-3 py-2 mb-4"
            type="text"
            value={post.title}
            onChange={handleChange}
            name="title"
          />

          <p className="text-left font-medium mb-1">内容</p>
          <input
            className="w-full border rounded px-3 py-2 mb-4"
            type="textarea"
            value={post.content}
            onChange={handleChange}
            name="content"
          />

          <p className="text-left font-medium mb-1">サムネイルURL</p>
          <input
            className="py-2"
            type="file"
            value={post.thumbnailUrl}
            onChange={handleChange}
            name="thumbnailUrl"
          />
          {post.thumbnailUrl !== "" && (
            <img
              src={post.thumbnailUrl}
              className="w-40 h-24 object-cover rounded mb-2"
            />
          )}
          <p className="text-left font-medium mb-1">カテゴリー</p>
          <div className="flex">
            {categories.map((category) => {
              const isSelected = selectedIds.includes(category.id);
              return (
                <label
                  key={category.id}
                  className={`border rounded-full px-4 py-2 text-black ${
                    isSelected ? "bg-blue-600" : "bg-white"
                  }`}
                >
                  {category.name}
                  <input
                    type="checkbox"
                    checked={isSelected}
                    onChange={() => handleCheck(category.id)}
                    className="hidden"
                  />
                </label>
              );
            })}
          </div>
          <button className="bg-blue-500 text-white font-bold rounded py-1 px-5 hover:bg-blue-600 transition-colors">
            作成
          </button>
        </form>
      </div>
    </div>
  );
}
