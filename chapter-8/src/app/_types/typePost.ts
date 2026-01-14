// export interface MicroCmsPost {
//   id: string;
//   title: string;
//   content: string;
//   createdAt: string;
//   categories: {
//     id: string;
//     name: string;
//   }[];
//   thumbnail: { url: string; height: number; width: number };
// }

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
