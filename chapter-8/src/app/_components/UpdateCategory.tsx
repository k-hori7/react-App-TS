"use client";
import { useParams } from "next/navigation";
import { useState } from "react";
import { useRouter } from "next/navigation";
export default function UpdateCategory() {
  const { id } = useParams();
  const [categoryName, setCategoryName] = useState("");
  const router = useRouter();
  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch(`/api/admin/categories/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name: categoryName }), //API側に名前合わせる必要ある
      });
      if (response.ok) {
        alert("更新に成功しました");
        setCategoryName(""); //入力にする
        router.push("/admin/categories");
        router.refresh();
      } else {
        alert("更新に失敗しました");
      }
    } catch (error) {
      console.error("通信エラー：", error);
    }
  };
  const handleDelete = async () => {
    if (!confirm("本当に削除しますか？")) return;
    try {
      const response = await fetch(`/api/admin/categories/${id}`, {
        method: "DELETE",
      });
      if (response.ok) {
        alert("削除に成功しました");
        router.push("/admin/categories");
        router.refresh();
      } else {
        alert("削除に失敗しました");
      }
    } catch (error) {
      console.error("通信エラー：", error);
    }
  };
  return (
    <div className="p-6">
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
        <div className="flex">
          <form onSubmit={handleUpdate}>
            <button
              className="bg-blue-600 text-white font-bold rounded py-1 px-5 mr-1 hover:bg-blue-700 transition-colors"
              type="submit"
            >
              更新
            </button>
          </form>
          <button
            className="bg-red-500 text-white font-bold rounded py-1 px-5 hover:bg-red-700 transition-colors"
            onClick={handleDelete}
          >
            削除
          </button>
        </div>
      </div>
    </div>
  );
}
