"use client";

import { useState } from "react";

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
  const [contactData, setContactData] = useState<DataContact>({
    name: "",
    mail: "",
    content: "",
  });
  const [error, setError] = useState<ErrCheck>({
    name: false,
    mail: false,
    content: false,
    nameMessage: false,
    contentMessage: false,
  });
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const handleClear = () => {
    setContactData({ name: "", mail: "", content: "" });
    setError({
      name: false,
      mail: false,
      content: false,
      nameMessage: false,
      contentMessage: false,
    });
  };
  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setContactData({ ...contactData, name: e.target.value });
  };
  const handleMailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setContactData({ ...contactData, mail: e.target.value });
  };
  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContactData({ ...contactData, content: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    let hasError = false;
    e.preventDefault();

    if (contactData.name.length > 30) {
      setError((prev) => ({ ...prev, nameMessage: true }));
      hasError = true;
    } else {
      setError((prev) => ({ ...prev, nameMessage: false }));
    }

    if (contactData.content.length > 500) {
      setError((prev) => ({ ...prev, contentMessage: true }));
      hasError = true;
    } else {
      setError((prev) => ({ ...prev, contentMessage: false }));
    }

    if (contactData.name === "") {
      setError((prev) => ({ ...prev, name: true }));
      hasError = true;
    } else {
      setError((prev) => ({ ...prev, name: false }));
    }

    if (contactData.mail === "") {
      setError((prev) => ({ ...prev, mail: true }));
      hasError = true;
    } else {
      setError((prev) => ({ ...prev, mail: false }));
    }

    if (contactData.content === "") {
      setError((prev) => ({ ...prev, content: true }));
      hasError = true;
    } else {
      setError((prev) => ({ ...prev, content: false }));
    }

    if (hasError) return;

    setIsSubmitting(true);
    try {
      await fetch(
        "https://1hmfpsvto6.execute-api.ap-northeast-1.amazonaws.com/dev/contacts",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: contactData.name,
            email: contactData.mail,
            message: contactData.content,
          }),
        }
      );
      alert("送信しました");
      handleClear();
    } catch (err: unknown) {
      alert("失敗しました");
      console.error("postを取得できません。:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-[800px] py-10 mx-auto">
      <h1 className="font-bold text-xl mb-10">問合わせフォーム</h1>
      <form onSubmit={handleSubmit}>
        <div className="flex justify-between items-center mb-6">
          <label className="w-[240px]">お名前</label>
          <div className="w-full">
            <input
              type="text"
              value={contactData.name}
              onChange={handleNameChange}
              disabled={isSubmitting}
              className="w-full p-4 border border-gray-300 rounded-md disabled:opacity-50 disabled:cursor-not-allowed"
            />
            {error.name && (
              <p className="text-red-600 text-sm mt-2">お名前は必須です。</p>
            )}
            {error.nameMessage && (
              <p className="text-red-600 text-sm mt-2">
                お名前は30文字以内で入力してください。
              </p>
            )}
          </div>
        </div>

        <div className="flex justify-between items-center mb-6">
          <label className="w-[240px]">メールアドレス</label>
          <div className="w-full">
            <input
              type="email"
              value={contactData.mail}
              onChange={handleMailChange}
              disabled={isSubmitting}
              className="w-full p-4 border border-gray-300 rounded-md disabled:opacity-50 disabled:cursor-not-allowed"
            />
            {error.mail && (
              <p className="text-red-600 text-sm mt-2">
                メールアドレスは必須です。
              </p>
            )}
          </div>
        </div>

        <div className="flex justify-between items-start mb-6">
          <label className="w-[240px]">本文</label>
          <div className="w-full">
            <textarea
              rows={8}
              value={contactData.content}
              onChange={handleContentChange}
              disabled={isSubmitting}
              className="w-full p-4 border border-gray-300 rounded-md disabled:opacity-50 disabled:cursor-not-allowed"
            />
            {error.content && (
              <p className="text-red-600 text-sm mt-2">本文は必須です。</p>
            )}
            {error.contentMessage && (
              <p className="text-red-600 text-sm mt-2">
                本文は500文字以内で入力してください。
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
            onClick={handleClear}
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
