import { MicroCmsPost } from "./MicroCmsPost";

// export type PostInfo = {
//   id: string;
//   title: string;
//   thumbnailUrl: string;
//   createdAt: string;
//   categories: string[];
//   content: string;
// };
export type DataPost = {
  post: MicroCmsPost;
};
export type DataPosts = {
  contents: MicroCmsPost[];
};
