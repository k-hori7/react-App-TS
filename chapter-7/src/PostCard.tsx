import { Link } from "react-router-dom";
import styles from "./PostCard.module.css";
import type { DataPost } from "./type";

export default function PostCard({ post }: DataPost) {
  return (
    <Link to={`/posts/${post.id}`}>
      <div className={styles.postCard}>
        <div className={styles.postInfo}>
          <div className={styles.postDate}>
            {new Date(post.createdAt).toLocaleDateString("ja-JP")}
          </div>
          <div className={styles.postCategory}>
            {post.categories.map((category: string, index: number) => (
              <div key={index} className={styles.postTag}>
                {category}
              </div>
            ))}
          </div>
        </div>
        <p className={styles.postTitle}>APIで取得した{post.title}</p>
        <div
          className={`${styles.postContent} ${styles.preview}`}
          dangerouslySetInnerHTML={{ __html: post.content }}
        ></div>
      </div>
    </Link>
  );
}
