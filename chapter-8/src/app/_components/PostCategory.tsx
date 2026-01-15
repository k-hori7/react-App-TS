"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function PostCategory() {
  const [categoryName, setCategoryName] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); //勝手にリロードされるのを防ぐ
    try {
      const response = await fetch("/api/admin/categories", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name: categoryName }), //API側に名前合わせる必要ある
      });
      if (response.ok) {
        alert("作成に成功しました");
        setCategoryName(""); //入力空にする
        router.push("/admin/categories");
        router.refresh();
      } else {
        alert("作成に失敗しました");
      }
    } catch (error) {
      console.error("通信エラー：", error);
    }
  };
  return (
    <div className="p-6">
      <form onSubmit={handleSubmit}>
        <div>
          <p className="text-left font-medium mb-1">カテゴリー名</p>
          <input
            className="w-full border rounded px-3 py-2 mb-4"
            type="text"
            value={categoryName}
            onChange={(e) => {
              setCategoryName(e.target.value);
            }}
          />
          <button
            className="bg-blue-500 text-white font-bold rounded py-1 px-5 hover:bg-blue-600 transition-colors"
            type="submit"
          >
            作成
          </button>
        </div>
      </form>
    </div>
  );
}
