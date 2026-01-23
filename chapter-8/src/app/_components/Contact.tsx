"use client";
import { useForm } from "react-hook-form";
export type DataContact = {
  name: string;
  mail: string;
  content: string;
};
export type ErrCheck = {
  name: boolean;
  mail: boolean;
  content: boolean;
  nameMessage: boolean;
  contentMessage: boolean;
};

export default function Contact() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting, errors },
  } = useForm<DataContact>();

  const onSubmit = async (data: DataContact) => {
    try {
      await fetch(
        "https://1hmfpsvto6.execute-api.ap-northeast-1.amazonaws.com/dev/contacts",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: data.name,
            email: data.mail,
            message: data.content,
          }),
        }
      );
      alert("送信しました");
      reset();
    } catch (err: unknown) {
      alert(`失敗しました Error:${err}`);
    }
  };

  return (
    <div className="max-w-[800px] py-10 mx-auto">
      <h1 className="font-bold text-xl mb-10">問合わせフォーム</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex justify-between items-center mb-6">
          <label className="w-[240px]">お名前</label>
          <div className="w-full">
            <input
              type="text"
              {...register("name", {
                required: "お名前は必須です。",
                maxLength: {
                  value: 30,
                  message: "お名前は30文字以内で入力してください。",
                },
              })}
              disabled={isSubmitting}
              className="w-full p-4 border border-gray-300 rounded-md disabled:opacity-50 disabled:cursor-not-allowed"
            />
            {errors.name && (
              <p className="text-red-600 text-sm mt-2">{errors.name.message}</p>
            )}
          </div>
        </div>

        <div className="flex justify-between items-center mb-6">
          <label className="w-[240px]">メールアドレス</label>
          <div className="w-full">
            <input
              type="email"
              {...register("mail", {
                required: "メールアドレスは必須です",
              })}
              disabled={isSubmitting}
              className="w-full p-4 border border-gray-300 rounded-md disabled:opacity-50 disabled:cursor-not-allowed"
            />
            {errors.mail && (
              <p className="text-red-600 text-sm mt-2">{errors.mail.message}</p>
            )}
          </div>
        </div>

        <div className="flex justify-between items-start mb-6">
          <label className="w-[240px]">本文</label>
          <div className="w-full">
            <textarea
              rows={8}
              {...register("content", {
                required: "本文は必須です",
                maxLength: {
                  value: 500,
                  message: "本文は500文字以内で入力してください。",
                },
              })}
              disabled={isSubmitting}
              className="w-full p-4 border border-gray-300 rounded-md disabled:opacity-50 disabled:cursor-not-allowed"
            />
            {errors.content && (
              <p className="text-red-600 text-sm mt-2">
                {errors.content?.message}
              </p>
            )}
          </div>
        </div>

        <div className="flex justify-center mt-10">
          <button
            type="submit"
            disabled={isSubmitting}
            className="font-bold py-2 px-4 rounded-md bg-gray-900 text-white mr-4 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            送信
          </button>
          <button
            type="button"
            onClick={() => reset()}
            disabled={isSubmitting}
            className="font-bold py-2 px-4 rounded-md bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            クリア
          </button>
        </div>
      </form>
    </div>
  );
}
