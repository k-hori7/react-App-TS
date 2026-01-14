export default function PostArticle() {
  return (
    <div className="p-6">
      <div>
        <p className="text-left font-medium mb-1">タイトル</p>
        <input className="w-full border rounded px-3 py-2 mb-4" type="text" />

        <p className="text-left font-medium mb-1">内容</p>
        <input className="w-full border rounded px-3 py-2 mb-4" type="text" />

        <p className="text-left font-medium mb-1">サムネイルURL</p>
        <input className="w-full border rounded px-3 py-2 mb-4" type="text" />

        <p className="text-left font-medium mb-1">カテゴリー</p>
        <input className="w-full border rounded px-3 py-2 mb-6" type="text" />

        <button className="bg-blue-500 text-white font-bold rounded py-2 px-6 hover:bg-blue-600 transition-colors">
          作成
        </button>
      </div>
    </div>
  );
}
