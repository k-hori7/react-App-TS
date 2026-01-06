export type PostInfo = {
  id: string;
  title: string;
  thumbnailUrl: string;
  createdAt: string;
  categories: string[];
  content: string;
};
export type DataPost = {
  post: PostInfo;
};
export type DataPosts = {
  posts: PostInfo[];
};
