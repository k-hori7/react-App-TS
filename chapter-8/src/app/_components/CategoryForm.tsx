"use clients";
import { useForm } from "react-hook-form";
type Props = {
  initialData?: string;
  onSubmit: (data: string) => Promise<void>;
  onDelete?: () => Promise<void>;
  submitButtonText: string;
};
type categoryData = {
  categoryName: string;
};
export default function CategoryForm({
  initialData,
  onSubmit,
  onDelete,
  submitButtonText,
}: Props) {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<categoryData>();
  const onProcess = async (data: categoryData) => {
    await onSubmit(data.categoryName);
  };
  return (
    <div className="p-6">
      <form onSubmit={handleSubmit(onProcess)}>
        <div>
          <p className="text-left font-medium mb-1">カテゴリー名</p>
          <input
            type="text"
            className="w-full border rounded px-3 py-2 mb-4"
            {...register("categoryName")}
            disabled={isSubmitting}
          />
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
    </div>
  );
}
