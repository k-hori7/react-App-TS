"use clients";
import { useState } from "react";
import { useEffect } from "react";
type Props = {
  initialData?: string;
  onSubmit: (data: string) => Promise<void>;
  onDelete?: () => Promise<void>;
  submitButtonText: string;
};
export default function CategoryForm({
  initialData,
  onSubmit,
  onDelete,
  submitButtonText,
}: Props) {
  const [categoryName, setCategoryName] = useState(initialData || "");
  useEffect(() => {
    setCategoryName(initialData || "");
  }, [initialData]);
  const [isPending, setIsPending] = useState<boolean>(false); //送信中かどうか
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsPending(true);
    try {
      await onSubmit(categoryName);
    } finally {
      setIsPending(false);
    }
  };
  return (
    <div className="p-6">
      <form onSubmit={handleSubmit}>
        <div>
          <p className="text-left font-medium mb-1">カテゴリー名</p>
          <input
            type="text"
            className="w-full border rounded px-3 py-2 mb-4"
            value={categoryName}
            disabled={isPending}
            onChange={(e) => {
              setCategoryName(e.target.value);
            }}
          />
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
    </div>
  );
}
