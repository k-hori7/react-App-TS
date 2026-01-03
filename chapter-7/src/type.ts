export type PostInfo = {
  id: string;
  title: string;
  thubmnailURL: string;
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
