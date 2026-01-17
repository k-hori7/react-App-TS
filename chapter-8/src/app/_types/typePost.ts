export type Category = {
  id: number;
  name: string;
};

export type PostCategory = {
  category: Category;
};

export interface NextApiPost {
  id: number;
  title: string;
  content: string;
  thumbnailUrl: string;
  createdAt: string; // API(JSON)から来る日付は文字列
  updatedAt: string;
  postCategories: PostCategory[];
}
export type DataPost = {
  post: NextApiPost;
};
export type DataPosts = {
  posts: NextApiPost[];
};
