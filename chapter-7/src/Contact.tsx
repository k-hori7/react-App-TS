import { useState } from "react";
import styles from "./Contact.module.css";

export default function Contact() {
  const [contactData, setContactData] = useState({
    name: "",
    mail: "",
    content: "",
  });
  const [error, setError] = useState({
    name: false,
    mail: false,
    content: false,
    nameMessage: false,
    contentMessage: false,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const handleClear = () => {
    setContactData({
      name: "",
      mail: "",
      content: "",
    });
    setError({
      name: false,
      mail: false,
      content: false,
      nameMessage: false,
      contentMessage: false,
    });
  };
  const handleNameChange = (e) => {
    setContactData({ ...contactData, name: e.target.value });
  };
  const handleMailChange = (e) => {
    setContactData({ ...contactData, mail: e.target.value });
  };
  const handleContentChange = (e) => {
    setContactData({ ...contactData, content: e.target.value });
  };
  const handleSubmit = async (e) => {
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
    //API
    try {
      await fetch(
        "https://1hmfpsvto6.execute-api.ap-northeast-1.amazonaws.com/dev/contacts",
        {
          method: "POST",
          headers: {},
          body: JSON.stringify({
            name: contactData.name,
            email: contactData.mail,
            message: contactData.content,
          }),
        }
      );
      alert("送信しました");
      handleClear();
    } catch (e) {
      alert("失敗しました");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <div className={styles.contactWrapper}>
        <h1 className={styles.contactTitle}>問い合わせフォーム</h1>
        <form onSubmit={handleSubmit}>
          <div className={styles.contactItem}>
            <label htmlFor="" className={styles.contactLabel}>
              お名前
            </label>
            <div className={styles.wFull}>
              <input
                type="text"
                value={contactData.name}
                onChange={handleNameChange}
                disabled={isSubmitting}
                className={`${styles.wFull} ${styles.inputItem}`}
              />
              {error.name && <p className={styles.error}>お名前は必須です。</p>}
              {error.nameMessage && (
                <p className={styles.error}>
                  お名前は30文字以内で入力してください。
                </p>
              )}
            </div>
          </div>
          <div className={styles.contactItem}>
            <label htmlFor="" className={styles.contactLabel}>
              メールアドレス
            </label>
            <div className={styles.wFull}>
              <input
                type="email"
                value={contactData.mail}
                onChange={handleMailChange}
                disabled={isSubmitting}
                className={`${styles.wFull} ${styles.inputItem}`}
              />
              {error.mail && (
                <p className={styles.error}>メールアドレスは必須です。</p>
              )}
            </div>
          </div>
          <div className={styles.contactItem}>
            <label htmlFor="" className={styles.contactLabel}>
              本文
            </label>
            <div className={styles.wFull}>
              <textarea
                id=""
                rows="8"
                value={contactData.content}
                onChange={handleContentChange}
                disabled={isSubmitting}
                className={`${styles.wFull} ${styles.inputItem} ${styles.contactTextarea}`}
              ></textarea>
              {error.content && (
                <p className={styles.error}>本文は必須です。</p>
              )}
              {error.contentMessage && (
                <p className={styles.error}>
                  本文は500文字以内で入力してください。
                </p>
              )}
            </div>
          </div>
          <div className={styles.contactButtonWrapper}>
            <button
              type="submit"
              disabled={isSubmitting}
              className={`${styles.contactButton} ${styles.contactButtonSubmit}`}
            >
              送信
            </button>
            <button
              type="button"
              onClick={handleClear}
              disabled={isSubmitting}
              className={`${styles.contactButton} ${styles.contactButtonClear}`}
            >
              クリア
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
