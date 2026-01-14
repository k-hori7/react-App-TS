export default function UpdateArticle() {
  return (
    <div className="pt-20 p-6">
      <div className="max-w-4xl">
        <p className="text-left font-medium mb-1">タイトル</p>
        <input className="w-full border rounded px-3 py-2 mb-4" type="text" />

        <p className="text-left font-medium mb-1">内容</p>
        <input className="w-full border rounded px-3 py-2 mb-4" type="text" />

        <p className="text-left font-medium mb-1">サムネイルURL</p>
        <input className="w-full border rounded px-3 py-2 mb-4" type="text" />

        <p className="text-left font-medium mb-1">カテゴリー</p>
        <input className="w-full border rounded px-3 py-2" type="text" />
      </div>
    </div>
  );
}
